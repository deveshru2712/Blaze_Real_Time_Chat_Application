import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./index";
import env from "./utils/validateEnv";

const httpServer = createServer(app);
const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("new user connected:", socket.id);
});

httpServer.listen(env.PORT, () => {
  console.log("Server is running on the port:", env.PORT);
});
