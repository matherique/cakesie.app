import z from "zod"

export const addItemInput = z.object({
  cakeId: z.string(),
  userId: z.string(),
});

export const getItemInput = z.object({
  userId: z.string(),
})