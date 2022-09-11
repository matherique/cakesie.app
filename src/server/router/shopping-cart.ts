import { addItemInput, getItemInput, hasItensInput } from "@/shared/validations/shopping-cart";
import { TRPCError } from "@trpc/server";
import { createRouter } from "./context";

export const shoppingCartRouter = createRouter().mutation("addItem", {
  input: addItemInput,
  async resolve({ input, ctx }) {
    const { session } = ctx
    if (!session) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: "you must be logged in",
      });
    }

    await prisma?.shoppingCart.create({
      data: {
        productId: input.cakeId,
        userId: session.id,
      }
    })
  },
}).query("getItens", {
  async resolve({ ctx }) {
    const { session } = ctx
    if (!session) {
      return []
    }

    return await prisma?.shoppingCart.findMany({
      where: { userId: session.id },
      include: { product: true, user: true }
    })
  }
}).query("hasItens", {
  async resolve({ ctx }) {
    const { session } = ctx
    if (!session) {
      return false
    }
    const resp = await prisma?.shoppingCart.findMany({
      where: { userId: session.id }
    })

    if (!resp) {
      return false
    }

    return resp.length > 0
  }
})