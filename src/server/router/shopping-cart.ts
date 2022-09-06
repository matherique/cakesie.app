import { addItemInput, getItemInput } from "@/shared/validations/shopping-cart";
import { createRouter } from "./context";

export const shoppingCartRouter = createRouter().mutation("addItem", {
  input: addItemInput,
  async resolve({ input, ctx }) {
    console.log(prisma?.shoppingCart)
    await prisma?.shoppingCart.create({
      data: {
        productId: input.cakeId,
        userId: input.userId,
      }
    })
  },
}).query("getItems", {
  input: getItemInput,
  async resolve({ input, ctx }) {
    return await prisma?.shoppingCart.findMany({
      where: { userId: input.userId }
    })
  }
})