import { Role } from "@prisma/client";
import { z } from "zod";
import { compare, hash } from "../../utils/encrypter";
import { createRouter } from "./context";

export const userRouter = createRouter()
  .mutation("create", {
    input: z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    }),
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
    input: z.object({
      email: z.string(),
      password: z.string(),
    }),
    async resolve({ input }) {
      const user = await prisma?.user.findFirstOrThrow({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("invalid email or password");
      }

      if (!compare(user.password, input.password)) {
        throw new Error("ivalid email or password");
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
