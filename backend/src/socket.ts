import { createServer } from "http";
import { Server } from "socket.io";
import { app } from "./index";
import env from "./utils/validateEnv";
import { redisClient } from "./utils/redis/redisClient";

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: env.CLIENT_URL },
});

// adding a middleware to check if redis is up or not

io.use(async (socket, next) => {
  if (!redisClient.isReady) {
    try {
      await redisClient.connect();
      next();
    } catch (err) {
      console.error("Redis connection error:", err);
      next(new Error("Redis service unavailable"));
    }
  } else {
    next();
  }
});

io.on("connection", async (socket) => {
  // listening for the event to register user entry for redis
  socket.on("register", async (userId: string, callback) => {
    try {
      // add user to the list of active user
      await redisClient.set(`active:${socket.id}`, userId, { EX: 60 });
      console.log("new user connected:", socket.id);

      callback({
        success: true,
        message: "User Successfully registered",
        userId,
      });
    } catch (error) {
      console.log(`Unable to register user`, error);

      callback({
        success: false,
        message: "Registration failed",
        userId,
      });
    }
  });

  // refresh the redis entry
  socket.on("heartbeat", async () => {
    await redisClient.expire(`active:${socket.id}`, 60);
  });

  socket.on("unregister", async () => {
    // remove the user from active user
    await redisClient.del(`active:${socket.id}`);
    console.log("user disconnected:", socket.id);
  });
});

httpServer.listen(env.PORT, async () => {
  await redisClient.connect();
  console.log("Server is running on the port:", env.PORT);
});

export default io;
