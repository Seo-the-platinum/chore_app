import { authRouter } from "./router/auth";
import { homeRouter } from "./router/home";
import { userRouter } from "./router/user";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  home: homeRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
