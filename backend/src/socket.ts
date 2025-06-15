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
  // register the user -> this will trigger when they sign-up
  socket.on("register-user", async (userId: string) => {
    // here i have two things to do
    await redisClient.set(`active:${socket.id}`, userId, { EX: 60 });
    await redisClient.set(`user:${userId}`, socket.id);
    console.log("User connected:", socket.id);
  });

  // for maintaining a active user list -> i am just refreshing it

  socket.on("heartbeat", async () => {
    await redisClient.expire(`active:${socket.id}`, 60);
  });

  socket.on("disconnect", async () => {
    await redisClient.del(`active:${socket.id}`);
    console.log("User disconnected:", socket.id);
  });
});

httpServer.listen(env.PORT, async () => {
  await redisClient.connect();
  console.log("Server is running on the port:", env.PORT);
});

export default io;
