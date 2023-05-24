import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getFilteredUsers: protectedProcedure
    .input(z.string())
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          username: {
            startsWith: input,
            mode: "insensitive",
          },
          NOT: {
            id: ctx.session.user.id,
          },
        },
        take: 5,
      });
    }),
  addUsername: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: input,
        },
      });
    }),
});
