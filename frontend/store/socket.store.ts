import { create } from "zustand";
import { io } from "socket.io-client";
import authStore from "./auth.store";
import { toast } from "sonner";

type SocketStore = SocketStoreState & SocketStoreActions;

const socketStore = create<SocketStore>((set, get) => ({
  socket: null,
  isProcessing: false,
  onlineUser: [],
  isTyping: false,
  isOnline: false,
  refreshInterval: null,
  searchOnlineUserInterval: null,
  setIsTyping: (value) => {
    set({ isTyping: value });
  },
  setSocket: () => {
    set({ isProcessing: true });
    const { socket } = get();
    const { user } = authStore.getState();
    try {
      if (user) {
        if (socket) {
          // going to un-register using the socket id
          socket.disconnect();
        }
        set({ socket: null, isOnline: false });
      }

      const newSocket = io(process.env.NEXT_PUBLIC_BACKEND_URL, {
        transports: ["websocket", "polling"],
        timeout: 5000,
        forceNew: true,
      });

      newSocket.on("connect", () => {
        // console.log("Socket connected:", newSocket.id);

        if (user) {
          // console.log("Emitting register for user:", user.id);
          newSocket.emit("register-user", user.id);
          set({ socket: newSocket, isProcessing: false, isOnline: true });
          toast.success("User online 🔥");
        }
      });
    } catch (error) {
      console.log("Unable to connect to the server", error);
      set({ isProcessing: false, socket: null, isOnline: false });
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
          if (socket && socket.connected) {
            socket.emit("heartbeat", (response: any) => {
              console.log("Response:", response);
              set({ isOnline: true });
            });
          } else {
            console.log("Socket is not connected");
            set({ isOnline: false });
          }
        }, 50000);

        set({ refreshInterval: interval, isProcessing: false });
      }
    } catch (error) {
      console.log("Error occurred while updating the active status", error);
    }
  },
  clearHeartBeatInterval: () => {
    const { refreshInterval } = get();
    if (refreshInterval) {
      clearInterval(refreshInterval);
      set({ refreshInterval: null, isOnline: false });
    }
  },
  disconnect: () => {
    set({ isProcessing: true });
    try {
      const { socket } = get();

      if (socket) {
        socket.disconnect();
      }

      set({ isProcessing: false, socket: null, isOnline: false });
    } catch (error) {
      console.log("Error occurred", error);
      set({ isProcessing: false, socket: null, isOnline: false });
    }
  },
  getOnlineUser: () => {
    const { socket, searchOnlineUserInterval } = get();

    if (socket && searchOnlineUserInterval) {
      clearInterval(searchOnlineUserInterval);
      // socket.off("request-online-users");
    }

    if (!socket) {
      console.log("No socket connection");
      return;
    }

    const fetchOnlineUser = () => {
      socket.emit("request-online-users");

      socket.on("online-users", (onlineUsers) => {
        // console.log("Received online users:", onlineUsers);
        set({ onlineUser: onlineUsers });
      });
    };
    const interval = setInterval(() => {
      fetchOnlineUser();
    }, 10000);

    set({ searchOnlineUserInterval: interval });
  },
  clearOnlineUserSearch: () => {
    const { socket, searchOnlineUserInterval } = get();
    if (searchOnlineUserInterval) {
      clearInterval(searchOnlineUserInterval);
    }
    if (socket) socket.off("online-users");
    set({ searchOnlineUserInterval: null });
  },
}));

export default socketStore;
