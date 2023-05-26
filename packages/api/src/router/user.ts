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
  sendInvite: protectedProcedure
    .input(z.object({ userId: z.string(), houseId: z.string() }))
    .mutation(({ ctx, input }) => {
      const { userId, houseId } = input;
      return ctx.prisma.invite.create({
        data: {
          house: {
            connect: {
              id: houseId,
            },
          },
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }),
});
