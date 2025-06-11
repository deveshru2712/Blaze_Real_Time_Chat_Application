import express from "express";
import { searchUser } from "../controller/user.controller";
const router = express.Router();

router.get("/", searchUser);

export default router;
