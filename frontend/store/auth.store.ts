import api from "@/utils/Axios";
import { toast } from "sonner";
import { create } from "zustand";

type AuthStore = AuthStoreState & AuthStoreActions;

const authStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: false,
  signUp: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await api.post(`/api/auth/sign-up`, credentials);
      set({ isLoading: false, user: response.data.newUser });
      toast.success(response.data.message + "🔥");
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });
      toast.error("Unable to create an account");
    }
  },
  logIn: async (credentials) => {
    set({ isLoading: true });
    try {
      const response = await api.post("/api/auth/sign-in", credentials);
      set({ isLoading: false, user: response.data.user });
      toast.success(response.data.message + "🔥");
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });
      toast.error("Unable to login");
    }
  },
  logOut: async () => {
    set({ isLoading: true });
    try {
      const response = await api.post("/api/auth/logout");
      set({ isLoading: false, user: null });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });
      toast.error("Unable to logout");
    }
  },
  authCheck: async (router) => {
    // Accept router as parameter
    const { isLoading } = get();
    if (isLoading) return;

    set({ isLoading: true });
    try {
      const response = await api("/api/auth/verify");
      set({ isLoading: false, user: response.data.user });
      console.log(response.data.user);

      const path = localStorage.getItem("redirectAfterAuth");
      if (path && router) {
        localStorage.removeItem("redirectAfterAuth");
        router.push(path);
      }
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });

      if (typeof window !== "undefined" && router) {
        const currentPath = window.location.pathname;
        if (currentPath !== "/sign-in") {
          localStorage.setItem("redirectAfterAuth", currentPath);
          router.push("/sign-in");
        }
      }
    }
  },
}));

export default authStore;
