import { RequestHandler } from "express";
import createHttpError from "http-errors";
import jwt from "jsonwebtoken";
import env from "../utils/validateEnv";
import prismaClient from "../utils/prismaClient";

type DecodedPayload = {
  userId: string;
};

const ProtectedRoute: RequestHandler = async (req, res, next) => {
  try {
    const cookie = req.cookies.blazeToken;
    if (!cookie) {
      throw createHttpError(401, "No cookie");
    }

    const decode = jwt.verify(cookie, env.JWT_KEY) as DecodedPayload;
    if (!decode) {
      throw createHttpError(401, "Invalid cookie");
    }

    const user = await prismaClient.user.findUnique({
      where: { id: decode.userId },
      select: {
        id: true,
        username: true,
        email: true,
      },
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default ProtectedRoute;
