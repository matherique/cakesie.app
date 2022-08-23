// src/server/router/context.ts
import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { unstable_getServerSession } from "next-auth";
import { prisma } from "@/server/db/client";
import { nextAuthConfig } from "@/config/next-auth";

export const createContext = async (ctx: trpcNext.CreateNextContextOptions) => {
  const { req, res } = ctx;
  const session = await unstable_getServerSession(req, res, nextAuthConfig);

  return {
    req,
    res,
    session,
    prisma,
  };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;

export const createRouter = () => trpc.router<Context>();
