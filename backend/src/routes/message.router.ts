import express from "express";
import ProtectedRoute from "../middleware/protectedRoute";
import * as messageController from "../controller/message.controller";
import inputValidator from "../middleware/inputValidator";
import { messageSchema } from "../utils/schema/messageSchema";

const router = express.Router();

router.get("/", ProtectedRoute, messageController.getMessage);

router.post(
  "/",
  ProtectedRoute,
  inputValidator(messageSchema),
  messageController.sendMessage
);

export default router;
