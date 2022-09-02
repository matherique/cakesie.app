import { getByIdSchema } from "@/shared/validations/cake";
import { createRouter } from "./context";

export const cakeRouter = createRouter().query("getAll", {
  async resolve() {
    return await prisma?.cake.findMany();
  },
}).query("getById", {
  input: getByIdSchema,
  async resolve({ input: { id } }) {
    return await prisma?.cake.findFirst({ where: { id } });
  },
})
