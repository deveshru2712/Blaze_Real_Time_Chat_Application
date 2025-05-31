import z from "zod";

export const SignUpSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least of 3 characters" }),
  email: z.string().email({ message: "Please provide a email" }),
  password: z.string().min(6, {
    message: "Password must be at least of 6 characters",
  }),
});

export const SignInSchema = z.object({
  email: z.string().email({ message: "Please provide a email" }),
  password: z.string().min(6, {
    message: "Password must be at least of 6 characters",
  }),
});

export type SignUpType = z.infer<typeof SignUpSchema>;
export type SignInType = z.infer<typeof SignInSchema>;
