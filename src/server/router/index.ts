// src/server/router/index.ts
import { createRouter } from "./context";
import superjson from "superjson";

import { cakeRouter } from "./cake";

export const appRouter = createRouter()
  .transformer(superjson)
  .merge("cake.", cakeRouter);

// export type definition of API
export type AppRouter = typeof appRouter;
