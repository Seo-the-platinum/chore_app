import { authRouter } from "./router/auth";
import { choreRouter } from "./router/chore";
import { homeRouter } from "./router/home";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  chore: choreRouter,
  home: homeRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
