import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const homeRouter = createTRPCRouter({
  addHome: protectedProcedure
    .input(z.object({ name: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const existingHouse = await ctx.prisma.house.findFirst({
        where: {
          name: {
            equals: input.name,
            mode: "insensitive",
          },
        },
      });
      if (!existingHouse) {
        return ctx.prisma.house.create({
          data: {
            name: input.name,
            adminId: ctx.session.user.id,
            members: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      } else {
        throw new Error("House already exists");
      }
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
      include: {
        admin: true,
      },
    });
  }),
  getHomeDetails: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.house.findUnique({
        where: {
          id: input.id,
        },
        include: {
          admin: true,
          chores: {
            include: {
              user: true,
            },
          },
          members: true,
        },
      });
    }),
  addChore: protectedProcedure
    .input(
      z.object({
        houseId: z.string(),
        title: z.string(),
        dueDate: z.date(),
        userId: z.string(),
        description: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.chore.create({
        data: {
          description: input.description,
          due: input.dueDate,
          title: input.title,
          house: {
            connect: {
              id: input.houseId,
            },
          },
          user: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
    }),
});
