import api from "@/utils/Axios";
import { create } from "zustand";
import authStore from "./auth.store";
import searchStore from "./search.store";

type MessageStore = MessageStoreState & MessageStoreActions;

const messageStore = create<MessageStore>((set, get) => ({
  receiverUser: null,
  userList: [],
  message: "",
  currentConversationId: null,
  messageArr: [],
  isPending: false,
  searchUsername: "",
  searchTimeoutId: null,
  isSearching: false,
  setMessageArr: (messageArr) => {
    set({ messageArr });
  },
  setCurrentConversationId: (conversationId) => {
    set({ currentConversationId: conversationId });
  },
  setMessage: (message) => {
    set({ message });
  },
  fetchingMessage: async (receiverId) => {
    set({ isPending: true });
    try {
      const response = await api(`/api/message/${receiverId}`);

      set({
        messageArr: response.data.result || [],
        isPending: false,
      });
    } catch (error) {
      set({ isPending: false, messageArr: [] });
      console.log("Error occurred while fetching messages:", error);
    }
  },
  // sendMessage: async (receiverId, message, socket) => {
  //   const { messageArr } = get();
  //   const { user: CurrentUser } = authStore.getState();

  //   if (!CurrentUser) {
  //     return;
  //   }

  //   const optimisticMessage = {
  //     id: `id-${Date.now()}`,
  //     senderId: CurrentUser.id,
  //     content: message,
  //     receiverId: receiverId,
  //     createdAt: new Date(),
  //   };

  //   try {
  //     if (!socket) {
  //       throw new Error("Socket connection not available");
  //     }

  //     set({ messageArr: [...messageArr, optimisticMessage] });

  //     const response = await api.post(`/api/message/${receiverId}`, {
  //       message,
  //     });

  //     const savedMessage = response.data.message;

  //     const { userList, setUserList } = searchStore.getState();

  //     const updateUserList = userList.map((user) => {
  //       if (user.id === receiverId) {
  //         if (user.conversations && user.conversations.length > 0) {
  //           return {
  //             ...user,
  //             conversations: [
  //               {
  //                 ...user.conversations[0],
  //                 messages: [savedMessage],
  //               },
  //             ],
  //           };
  //         }
  //         if (!user.conversations) {
  //           const optimisticConversation;
  //           return {
  //             ...user,
  //             conversations,
  //           };
  //         }
  //       }
  //       return user;
  //     });

  //     setUserList(updateUserList);

  //     // Replace optimistic message with saved message
  //     const { messageArr: currentMessages } = get();
  //     set({
  //       messageArr: currentMessages.map((msg) =>
  //         msg.id === optimisticMessage.id ? savedMessage : msg
  //       ),
  //     });

  //     socket.emit("send-message", savedMessage);
  //   } catch (error) {
  //     console.log(error);
  //     const { messageArr: currentMessages } = get();
  //     set({
  //       messageArr: currentMessages.map((msg) =>
  //         msg.id === optimisticMessage.id
  //           ? { ...msg, status: "failed", error: true }
  //           : msg
  //       ),
  //     });
  //   }
  // },
  sendMessage: async (receiverId, message, socket) => {
    const { messageArr } = get();
    const { user: CurrentUser } = authStore.getState();

    if (!CurrentUser) {
      return;
    }

    const optimisticMessage = {
      id: `id-${Date.now()}`,
      senderId: CurrentUser.id,
      content: message,
      receiverId: receiverId,
      createdAt: new Date(),
    };

    try {
      if (!socket) {
        throw new Error("Socket connection not available");
      }

      set({ messageArr: [...messageArr, optimisticMessage] });

      const { userList, setUserList } = searchStore.getState();

      const optimisticUserList = userList.map((user) => {
        if (user.id === receiverId) {
          if (user.conversations && user.conversations.length > 0) {
            return {
              ...user,
              conversations: [
                {
                  ...user.conversations[0],
                  messages: [optimisticMessage],
                  updatedAt: new Date(),
                },
              ],
            };
          }

          // If  conversation does not exists then, creating an optimistic conversation
          const optimisticConversation = {
            id: `conversation-${Date.now()}`,
            participants: [CurrentUser, user],
            messages: [optimisticMessage],
            createdAt: new Date(),
          };

          return {
            ...user,
            conversations: [optimisticConversation],
          };
        }
        return user;
      });

      setUserList(optimisticUserList);

      const response = await api.post(`/api/message/${receiverId}`, {
        message,
      });

      const savedMessage = response.data.message;

      const { userList: currentUserList } = searchStore.getState();

      const finalUserList = currentUserList.map((user) => {
        if (user.id === receiverId) {
          if (user.conversations && user.conversations.length > 0) {
            return {
              ...user,
              conversations: [
                {
                  ...user.conversations[0],
                  id: savedMessage.conversationId || user.conversations[0].id,
                  messages: [savedMessage],
                  updatedAt: new Date(),
                },
              ],
            };
          }

          const newConversation = {
            id: savedMessage.conversationId || `conversation-${Date.now()}`,
            participants: [CurrentUser, user],
            messages: [savedMessage],
            createdAt: new Date(),
          };

          return {
            ...user,
            conversations: [newConversation],
          };
        }
        return user;
      });

      setUserList(finalUserList);

      const { messageArr: currentMessages } = get();
      set({
        messageArr: currentMessages.map((msg) =>
          msg.id === optimisticMessage.id ? savedMessage : msg
        ),
      });

      // Emit socket event with real message
      socket.emit("send-message", savedMessage);
    } catch (error) {
      console.log(error);

      const { messageArr: currentMessages } = get();
      const { userList: currentUserList, setUserList } = searchStore.getState();

      set({
        messageArr: currentMessages.map((msg) =>
          msg.id === optimisticMessage.id
            ? { ...msg, status: "failed", error: true }
            : msg
        ),
      });

      // Reverting  conversation updates
      const revertedUserList = currentUserList.map((user) => {
        if (user.id === receiverId && user.conversations) {
          return {
            ...user,
            conversations: user.conversations
              .map((conversation) => ({
                ...conversation,
                messages:
                  conversation.messages?.filter(
                    (msg) => msg.id !== optimisticMessage.id
                  ) || [],
              }))
              .filter(
                (conversation) =>
                  conversation.messages && conversation.messages.length > 0
              ),
          };
        }
        return user;
      });

      setUserList(revertedUserList);
    }
  },
}));

export default messageStore;
