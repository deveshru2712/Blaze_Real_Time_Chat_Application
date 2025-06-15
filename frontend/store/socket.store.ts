import { create } from "zustand";
import { io } from "socket.io-client";
import authStore from "./auth.store";
import { toast } from "sonner";

type SocketStore = SocketStoreState & SocketStoreActions;

const socketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isProcessing: false,
  refreshInterval: null,
  setSocket: () => {
    set({ isProcessing: true });
    const { socket } = socketStore.getState();
    const { user } = authStore.getState();
    try {
      if (user) {
        if (socket) {
          // going to un-register using the socket id
          socket.disconnect();
        }
        set({ socket: null });
      }

      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

      if (user) {
        // calling the register function
        newSocket.emit("register", user.id);
        set({ socket: newSocket, isProcessing: false });
        toast.success("User online 🔥");
      }
    } catch (error) {
      console.log("Unable to connect to the server", error);
      set({ isProcessing: false, socket: null });
      toast.error("User offline 💀");
    }
  },
  startHeartBeat: () => {
    set({ isProcessing: true });
    const { socket, refreshInterval } = get();
    try {
      if (socket && !refreshInterval) {
        socket.emit("heartbeat");

        // so that we can maintain active status
        const interval = setInterval(() => {
          if (socket.connected) {
            socket.emit("heartbeat");
          }
        }, 50000);

        set({ refreshInterval: interval });
      }
    } catch (error) {
      console.log(error);
    }
  },
  clearRefreshInterval: () => {
    const { refreshInterval } = get();
    if (refreshInterval) {
      clearInterval(refreshInterval);
      set({ refreshInterval: null });
    }
  },
  disconnect: () => {
    set({ isProcessing: true });
    try {
      const { socket } = socketStore.getState();

      if (socket) {
        socket.disconnect();
      }

      set({ isProcessing: false, socket: null });
    } catch (error) {
      console.log("Error occurred", error);
      set({ isProcessing: false, socket: null });
    }
  },
}));

export default socketStore;
