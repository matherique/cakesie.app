import { z } from "zod";

export const signupSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
});

export type SinupScheumaType = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
