import { z } from "zod";

export const articleSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  category: z.string().nonempty("Category is required"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  thumbnails: z.string().optional(),
});

export type ArticleSchema = z.infer<typeof articleSchema>;
