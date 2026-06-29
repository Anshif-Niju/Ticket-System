import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Please enter a valid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
});

export const ticketSchema = z.object({
  title: z.string().trim().min(3, "Title must be at least 3 characters long"),
  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters long"),
  category: z.string().trim().min(2, "Category is required"),
  priority: z.enum(["Low", "Medium", "High"]),
});
