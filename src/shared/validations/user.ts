import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SignupSchemaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const searchSchema = z.object({
  query: z.string().nullable(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;

export const createSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  role: z.string().nullable(),
})

export type CreateUserType = z.infer<typeof createSchema>;

export const deleteByIdSchema = z.object({
  id: z.string(),
})
