import express from "express";
import * as authController from "../controller/auth.controller";
import inputValidator from "../middleware/inputValidator";
import { SignInSchema, SignUpSchema } from "../utils/schema/AuthSchema";
const router = express.Router();

router.post("/sign-up", inputValidator(SignUpSchema), authController.signUp);
router.post("/sign-in", inputValidator(SignInSchema), authController.signIn);
router.post("/logout", authController.logOut);

// router.post("/verify");

export default router;
