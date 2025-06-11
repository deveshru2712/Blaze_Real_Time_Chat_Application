import { create } from "zustand";
import { Socket, io } from "socket.io-client";
import authStore from "./auth.store";
import { toast } from "sonner";

interface SocketStoreState {
  socket: Socket | null;
  isProcessing: boolean;
}

interface SocketStoreActions {
  setSocket: () => void;
  disconnect: () => void;
}

type SocketStore = SocketStoreState & SocketStoreActions;

const socketStore = create<SocketStore>((set) => ({
  socket: null,
  isProcessing: false,
  setSocket: () => {
    set({ isProcessing: true });
    const { socket } = socketStore.getState();
    const { user } = authStore.getState();
    try {
      if (user) {
        if (socket) {
          // going to un-register using the socket id
          socket.emit("unregister");
          socket.disconnect();
        }
        set({ socket: null });
      }

      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL);

      if (user) {
        // calling the register function
        newSocket.emit(
          "register",
          user.id,
          (response: { success: boolean; message: string; userId: string }) => {
            if (response.success) {
              toast.success(response.message);
            } else {
              toast.error(response.message);
            }
          }
        );
        set({ socket: newSocket, isProcessing: false });
      }
    } catch (error) {
      console.log("Unable to connect to the server", error);
      set({ isProcessing: false, socket: null });
    }
  },
  disconnect: () => {
    set({ isProcessing: true });
    try {
      const { socket } = socketStore.getState();

      if (socket) {
        socket.emit("unregister");
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
