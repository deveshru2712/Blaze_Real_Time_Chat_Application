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
      const response = await api(`/message/${receiverId}`);

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
    try {
      if (!socket) {
        throw new Error("Socket connection not available");
      }

      const response = await api.post(`/message/${receiverId}`, { message });

      const savedMessage = response.data.message;

      set({ messageArr: [...messageArr, savedMessage] });

      socket.emit("send-message");
    } catch (error) {
      console.log(error);
    }
  },
}));

export default messageStore;
