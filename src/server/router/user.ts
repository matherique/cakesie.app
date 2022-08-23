import { loginSchema, signupSchema } from "@/shared/validations/user";
import { Role } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { compare, hash } from "../../utils/encrypter";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .mutation("create", {
    input: signupSchema,
    async resolve({ input }) {
      const hashed = await hash(input.password);

      const user = await prisma?.user.create({
        data: {
          name: input.name,
          email: input.email,
          password: hashed,
        },
      });

      if (!user) throw new Error("could not create user");

      return user;
    },
  })
  .mutation("login", {
    input: loginSchema,
    async resolve({ input }) {
      const user = await prisma?.user.findFirst({
        where: { email: input.email },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "user not found",
        });
      }

      if (!compare(user.password, input.password)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "invalid email or password",
        });
      }

      return user;
    },
  })
  .query("getAll", {
    async resolve() {
      return await prisma?.user.findMany({
        where: { role: Role.CLIENT },
      });
    },
  });
