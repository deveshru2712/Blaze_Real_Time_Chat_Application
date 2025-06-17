import api from "@/utils/Axios";
import { create } from "zustand";

type SearchStore = SearchStoreState & SearchStoreActions;

const searchStore = create<SearchStore>((set, get) => ({
  userList: [],
  receiverUser: null,
  searchUsername: "",
  isSearching: false,
  searchTimeout: null,
  hasSearched: false,
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

    set({ searchUsername: username, hasSearched: false });

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
          hasSearched: true,
          isSearching: false,
        });
      } catch (error) {
        set({ userList: [], hasSearched: true, isSearching: false });
        console.error(error);
      }
    }, 1000);

    set({ searchTimeout: timeOut });
  },
}));

export default searchStore;
