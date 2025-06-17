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
      const response = await api.post(`/auth/sign-up`, credentials);
      console.log(response.data.newUser);
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
      const response = await api.post("/auth/sign-in", credentials);
      console.log(response.data.user);
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
      const response = await api.post("/auth/logout");
      console.log(response.data);
      set({ isLoading: false, user: null });
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);
      set({ isLoading: false });

      toast.error("Unable to logout");
    }
  },
  // authCheck: async () => {
  //   set({ isLoading: true });
  //   try {
  //     const response = await api("/auth/verify");
  //     set({ isLoading: false, user: response.data.user });
  //     console.log("verified user", response.data.user);
  //   } catch (error) {
  //     console.log(error);
  //     set({ isLoading: false, user: null });
  //   }
  // },
  authCheck: async (router) => {
    // Accept router as parameter
    if (get().isLoading) return;

    set({ isLoading: true });
    try {
      const response = await api("/auth/verify");
      set({ isLoading: false, user: response.data.user });

      const path = localStorage.getItem("redirectAfterAuth");
      if (path && router) {
        localStorage.removeItem("redirectAfterAuth");
        router.push(path); // Use Next.js router instead of window.location.href
      }
      console.log("verified user", response.data.user);
    } catch (error) {
      console.log(error);
      set({ isLoading: false, user: null });

      if (typeof window !== "undefined" && router) {
        const currentPath = window.location.pathname;
        if (currentPath !== "/sign-in") {
          localStorage.setItem("redirectAfterAuth", currentPath);
          router.push("/sign-in"); // Use router.push instead of window.location.href
        }
      }
    }
  },
}));

export default authStore;
