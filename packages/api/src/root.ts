import { authRouter } from "./router/auth";
import { homeRouter } from "./router/home";
import { postRouter } from "./router/post";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  post: postRouter,
  auth: authRouter,
  home: homeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
