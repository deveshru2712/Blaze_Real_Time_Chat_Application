import z from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(3, { message: "Message must contain at least 3 character" }),
});

export type MessageType = z.infer<typeof messageSchema>;
