import express from "express";
import * as authController from "../controller/auth.controller";
import inputValidator from "../middleware/inputValidator";
import { SignInSchema, SignUpSchema } from "../utils/schema/AuthSchema";
import ProtectedRoute from "../middleware/protectedRoute";
const router = express.Router();

router.post("/sign-up", inputValidator(SignUpSchema), authController.signUp);
router.post("/sign-in", inputValidator(SignInSchema), authController.signIn);
router.post("/logout", ProtectedRoute, authController.logOut);

router.get("/verify", ProtectedRoute, authController.verify);

export default router;
