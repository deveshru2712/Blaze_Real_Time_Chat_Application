import { ExpressAuth } from "@auth/express";
import Credentials from "@auth/express/providers/credentials";
import { app } from "../index";
import prismaClient from "../utils/prismaClient";
import bcrypt from "bcryptjs";

app.use(
  "/auth/*",
  ExpressAuth({
    providers: [
      Credentials({
        credentials: {
          email: {
            type: "email",
            label: "Email",
            placeholder: "your@mail.com",
          },
          password: {
            type: "password",
            label: "Password",
            placeholder: "......",
          },
        },
        authorize: async (credentials: any) => {
          if (!credentials || !credentials.email || !credentials.password) {
            throw new Error("Missing credentials");
          }

          let user = await prismaClient.user.findUnique({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              username: true,
              email: true,
              password: true,
            },
          });

          if (!user) {
            throw new Error("User not found");
          }

          const checkPassword = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!checkPassword) {
            throw new Error("Invalid credentials");
          }
          return user;
        },
      }),
    ],
  })
);
