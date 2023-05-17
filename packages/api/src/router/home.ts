import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const homeRouter = createTRPCRouter({
  addHome: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.house.create({
        data: {
          name: input.name,
          adminId: ctx.session.user.id,
        },
      });
    }),
  getHomes: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.house.findMany({
      where: {
        OR: [
          {
            adminId: ctx.session.user.id,
          },
          {
            members: {
              some: {
                id: ctx.session.user.id,
              },
            },
          },
        ],
      },
    });
  }),
});
