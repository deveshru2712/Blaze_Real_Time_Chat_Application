import express from "express";
import http from "http";
import { Server } from "socket.io";
import env from "./utils/validateEnv";
import { redisClient } from "./utils/redis/redisClient";
import prismaClient from "./utils/prismaClient";

export const app = express();

export const server = http.createServer(app);
export const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
});

// Adding debug logs to see what's happening
console.log("Socket.IO server initialized");
console.log("CORS origin:", env.CLIENT_URL);

// Adding a middleware to check if redis is up or not
io.use(async (socket, next) => {
  console.log("Middleware executing for socket:", socket.id);

  if (!redisClient.isReady) {
    try {
      console.log("Attempting Redis connection");
      await redisClient.connect();
      console.log("Redis connected successfully");
      next();
    } catch (err) {
      console.error("Redis connection error:", err);
      next(new Error("Redis service unavailable"));
    }
  } else {
    console.log("Redis already connected");
    next();
  }
});

// Add error handling for the io server
io.engine.on("connection_error", (err) => {
  console.log("Connection error:", err.req);
  console.log("Error code:", err.code);
  console.log("Error message:", err.message);
  console.log("Error context:", err.context);
});

io.on("connection", async (socket) => {
  console.log("Client connected with socket ID:", socket.id);
  console.log("Total connected clients:", io.engine.clientsCount);

  // Add error handling for individual socket
  socket.on("error", (error) => {
    console.error("Socket error for", socket.id, ":", error);
  });

  // register the user -> this will trigger when they sign-up
  socket.on("register-user", async (userId: string) => {
    console.log("Registering user:", userId, "with socket:", socket.id);

    try {
      // here i have two things to do
      await redisClient.set(`active:${socket.id}`, userId, { EX: 60 });
      await redisClient.set(`user:${userId}`, socket.id);
      console.log("✅ User registered in Redis:", socket.id);

      // join all the room previously was in
      const conversationId = await prismaClient.conversation.findMany({
        where: { participants: { some: { id: userId } } },
        select: { id: true },
      });

      conversationId.forEach((conversation) => {
        socket.join(conversation.id);
        console.log(`Socket ${socket.id} joined room ${conversation.id}`);
      });

      console.log(`${socket.id} joined ${conversationId.length} rooms`);
    } catch (error) {
      console.error("Error in register-user:", error);
    }
  });

  socket.on("heartbeat", async () => {
    console.log("Heartbeat from:", socket.id);
    try {
      await redisClient.expire(`active:${socket.id}`, 60);
    } catch (error) {
      console.error("Error in heartbeat:", error);
    }
  });

  socket.on("send-message", () => {
    console.log(" Message event received from:", socket.id);
  });

  socket.on("disconnect", async () => {
    console.log(" User disconnected:", socket.id);
    try {
      await redisClient.del(`active:${socket.id}`);
      console.log(" Cleaned up Redis for:", socket.id);
    } catch (error) {
      console.error(" Error cleaning up Redis:", error);
    }
  });
});
