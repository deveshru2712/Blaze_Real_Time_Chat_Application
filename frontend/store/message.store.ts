import api from "@/utils/Axios";
import { create } from "zustand";

type MessageStore = MessageStoreState & MessageStoreActions;

const messageStore = create<MessageStore>((set, get) => ({
  receiverUser: null,
  userList: [],
  message: "",
  messageArr: [],
  isPending: false,
  searchUsername: "",
  searchTimeoutId: null,
  isSearching: false,
  setMessage: (message) => {
    set({ message });
  },
  setReceiverUser: (user) => {
    set({ receiverUser: user });
  },
  // cleaning up the timeout
  clearSearch: () => {
    const { searchTimeoutId } = get();
    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    set({
      searchUsername: "",
      userList: [],
      isSearching: false,
      searchTimeoutId: null,
    });
  },
  // for searching the user
  setSearchUsername: (username) => {
    const { searchTimeoutId } = get();

    if (searchTimeoutId) {
      clearTimeout(searchTimeoutId);
    }

    set({ searchUsername: username });

    if (!username.trim()) {
      set({ userList: [], isSearching: false, searchTimeoutId: null });
      return;
    }

    set({ isSearching: true });

    const timeOutId = setTimeout(async () => {
      try {
        const response = await api(`/user`, {
          params: { username: username.trim() },
        });

        set({
          userList: response.data.users,
          isSearching: false,
          searchTimeoutId: null,
          searchUsername: "",
        });
      } catch (error) {
        set({
          userList: [],
          isSearching: false,
          searchTimeoutId: null,
          searchUsername: "",
        });
        console.log(error);
      }
    }, 500);

    set({ searchTimeoutId: timeOutId });
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
  sendingMessage: async () => {},
}));

export default messageStore;
