import z from "zod"

export const addItemInput = z.object({
  cakeId: z.string(),
});

export const hasItensInput = z.object({
  userId: z.string(),
})

export const updateQuantity = z.object({
  id: z.string(),
  quantity: z.number(),
})