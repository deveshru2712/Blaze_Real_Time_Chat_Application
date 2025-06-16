import { RequestHandler } from "express";
import prismaClient from "../utils/prismaClient";

export const searchUser: RequestHandler<
  unknown,
  unknown,
  unknown,
  { username: string }
> = async (req, res, next) => {
  const { username } = req.query;
  const currentUser = req.user.id;
  try {
    if (!username || !username.trim()) {
      res
        .status(400)
        .json({ success: false, message: "Please provide a username" });
      return;
    }

    const users = await prismaClient.user.findMany({
      where: {
        username: {
          contains: username.trim(),
          mode: "insensitive",
        },
        NOT: { id: currentUser },
      },

      select: { id: true, username: true, email: true },
    });

    res.json({
      success: true,
      users,
    });
  } catch (error) {
    next(error);
  }
};
