import api from "@/utils/Axios";
import { create } from "zustand";

type SearchStore = SearchStoreState & SearchStoreActions;

const searchStore = create<SearchStore>((set, get) => ({
  userList: [],
  receiverUser: null,
  searchUsername: "",
  isSearching: false,
  searchTimeout: null,
  setReceiverUser: (user) => {
    set({ receiverUser: user });
  },
  // cleaning up the timeout
  clearSearch: () => {
    const { searchTimeout } = get();
    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    set({
      searchUsername: "",
      userList: [],
      isSearching: false,
      searchTimeout: null,
    });
  },
  // for searching the user
  setSearchUsername: (username) => {
    const { searchTimeout } = get();

    if (searchTimeout) {
      clearTimeout(searchTimeout);
    }

    set({ searchUsername: username });

    if (!username.trim()) {
      set({ userList: [], isSearching: false, searchTimeout: null });
      return;
    }

    set({ isSearching: true });

    const timeOut = setTimeout(async () => {
      try {
        const response = await api(`/user`, {
          params: { username: username.trim() },
        });

        set({
          userList: response.data.users,
          isSearching: false,
          searchTimeout: null,
          searchUsername: "",
        });
      } catch (error) {
        set({
          userList: [],
          isSearching: false,
          searchTimeout: null,
          searchUsername: "",
        });
        console.log(error);
      }
    }, 500);

    set({ searchTimeout: timeOut });
  },
}));

export default searchStore;
