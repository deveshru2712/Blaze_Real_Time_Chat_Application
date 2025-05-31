import jwt from "jsonwebtoken";
import env from "./validateEnv";
import { CookieOptions } from "express";

const genToken = (userId: string) => {
  if (!userId || typeof userId != "string") {
    return {
      success: false,
      message: "Invalid userId",
    };
  }

  try {
    const token = jwt.sign({ userId: userId }, env.JWT_KEY, {
      expiresIn: "7d",
    });

    const cookieOption: CookieOptions = {
      secure: env.NODE_ENV == "production",
      path: "/",
      sameSite: "lax",
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };

    return {
      success: true,
      token,
      cookieOption,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
    };
  }
};

export default genToken;
