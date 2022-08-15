import { createRouter } from "./context";

export const cakeRouter = createRouter().query("getAll", {
  async resolve() {
    return await prisma?.cake.findMany();
  },
});
