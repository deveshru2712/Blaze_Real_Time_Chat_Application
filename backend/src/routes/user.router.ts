import express from "express";
import { searchUser } from "../controller/user.controller";
import ProtectedRoute from "../middleware/protectedRoute";
const router = express.Router();

router.get("/", ProtectedRoute, searchUser);

export default router;
