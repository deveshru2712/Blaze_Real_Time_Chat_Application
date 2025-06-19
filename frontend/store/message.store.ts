import api from "@/utils/Axios";
import { create } from "zustand";
import authStore from "./auth.store";

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
  sendMessage: async (receiverId, message, socket) => {
    const { messageArr } = get();
    const { user } = authStore.getState();

    if (!user) {
      return;
    }
    const optimisticMessage: Message = {
      id: `id-${Date.now()}`,
      senderId: user.id,
      content: message,
      receiverId: receiverId,
      createdAt: Date.now(),
    };
    try {
      if (!socket) {
        throw new Error("Socket connection not available");
      }

      // firstly setting the optimistic message
      set({ messageArr: [...messageArr, optimisticMessage] });
      const response = await api.post(`/api/message/${receiverId}`, {
        message,
      });

      // when i receiver conformation i will replace it will the backend response one

      const savedMessage = response.data.message;

      const { messageArr: CurrentMessage } = get();

      set({ messageArr: [...CurrentMessage, savedMessage] });

      socket.emit("send-message");
    } catch (error) {
      console.log(error);
      const { messageArr: currentMessages } = get();
      set({
        messageArr: currentMessages.map((msg) =>
          msg.id === optimisticMessage.id
            ? { ...msg, status: "failed", error: true }
            : msg
        ),
      });
    }
  },
}));

export default messageStore;
