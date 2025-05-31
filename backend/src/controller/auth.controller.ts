import { RequestHandler } from "express";
import { SignUpType } from "../utils/schema/AuthSchema";
import createHttpError from "http-errors";
import prismaClient from "../utils/prismaClient";
import bcrypt from "bcryptjs";
import genToken from "../utils/genToken";

export const signUp: RequestHandler<
  unknown,
  unknown,
  SignUpType,
  unknown
> = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      throw createHttpError(400, "Invalid inputs");
    }

    const existingUser = await prismaClient.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw createHttpError(400, "Email already in user");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await prismaClient.user.create({
      data: { email, username, password: hashPassword },
    });

    if (!newUser) {
      throw createHttpError(400, "Unable to create account");
    }

    const session = genToken(newUser.id);

    if (!session.success) {
      res.status(400).json({
        message: session.message,
        action: "Login",
      });
      return;
    }

    res.cookie("blazeToken", session.token, { ...session.cookieOption });
    res.status(201).json({
      message: "Account created successfully",
    });
    return;
  } catch (error) {
    next(error);
  }
};

export const signIn = () => {};

export const logOut = () => {};
