import z from "zod";

export const updateSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().optional(),
    password: z.string(),
    profilePicture: z.string().optional(),
  })
  .refine((data) => data.email || data.profilePicture || data.username, {
    message:
      "At least one field (username, email, or profile picture) must be provided",
  });

export type updateBodyType = z.infer<typeof updateSchema>;
