import { z } from "zod";

export const getByIdSchema = z.object({
  id: z.string(),
});
