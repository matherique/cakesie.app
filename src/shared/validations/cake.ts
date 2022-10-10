import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.string(),
});

export const removePhotoSchema = z.object({
  cakeId: z.string(),
  photoId: z.string(),
});

export const createSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  photos_length: z.number(),
  files: z.array(z.string())
})


export type CreateCakeSchemaType = z.infer<typeof createSchema>;
