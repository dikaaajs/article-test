import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .nonempty("Username field cannot be empty")
    .min(3, "Username must be at least 3 characters long"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  role: z.enum(["Admin", "User"], {
    message: "Role must be selected",
  }),
});

export const loginSchema = z.object({
  username: z.string().nonempty("Please enter your username"),
  password: z.string().nonempty("Please enter your password"),
});

export type RegisterSchema = z.infer<typeof registerSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
