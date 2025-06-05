import api from "@/utils/Axios";
import { toast } from "sonner";
import { create } from "zustand";

type AuthStore = AuthStoreState & AuthStoreActions;

const authStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/auth/sign-up`, credentials);
      console.log(response.data.user);
      set({ isLoading: false, user: response.data.user });
      toast.success(response.data.message);
    } catch (error: any) {
      console.log(error);
      set({ isLoading: false, user: null });
      toast.error(error.message);
    }
  },
  logIn: async () => {
    set({ isLoading: true });
    try {
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
    }
  },
  authCheck: async () => {
    set({ isLoading: true });
    try {
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });
    }
  },
}));

export default authStore;
