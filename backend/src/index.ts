import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import env from "./utils/validateEnv";
import { z } from "zod";
import cors from "cors";

export const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("hii there");
});

app.use((req, res, next) => {
  res.status(404).json({ message: "Page not found" });
});

app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = "Something went wrong";
  let statusCode = 500;
  let stack: string | undefined;

  // handling zod errors
  if (error instanceof z.ZodError) {
    const errors = error.errors.map((issue) => ({
      field: issue.path.join(".") || "request",
      message: issue.message,
    }));

    res
      .status(400)
      .json({ success: false, message: "Validation error", errors });
    return;
  }

  // handling http errors
  if (error instanceof Error) {
    if ("status" in error && typeof error.status === "number") {
      statusCode = error.status;
    }
    errorMessage = error.message;
    stack = env.NODE_ENV === "development" ? error.stack : undefined;
  }

  res.status(statusCode).json({
    success: false,
    message: errorMessage,
    stack,
  });
  return;
});

app.listen(env.PORT, () => {
  console.log("Backend is running on the server:", env.PORT);
});
