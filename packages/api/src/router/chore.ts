import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const choreRouter = createTRPCRouter({
  getChoreDetails: protectedProcedure
    .input(z.object({ choreId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.chore.findUnique({
        where: {
          id: input.choreId,
        },
        include: {
          user: true,
          house: true,
        },
      });
    }),
});
