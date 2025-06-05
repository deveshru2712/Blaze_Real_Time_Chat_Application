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
      console.log(response.data.newUser);
      set({ isLoading: false, user: response.data.newUser });
      toast.success(response.data.message + "🔥");
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });

      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  },
  logIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/sign-in", credentials);
      console.log(response.data.user);
      set({ isLoading: false, user: response.data.user });
      toast.success(response.data.message + "🔥");
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
      const response = await api.post("/auth/logout");
      console.log(response.data);
      set({ isLoading: false, user: null });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";

      toast.error(errorMessage);
    }
  },
  authCheck: async () => {
    set({ isLoading: true });
    try {
      const response = await api("/auth/verify");
      set({ isLoading: false, user: response.data.user });
      console.log("verified user", response.data.user);
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });
    }
  },
}));

export default authStore;
