import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const userRouter = createTRPCRouter({
  getUsersChores: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.chore.findMany({
      where: {
        userId: ctx.session.user.id,
        completed: false,
      },
      include: {
        house: true,
      },
      orderBy: {
        house: {
          name: "asc",
        },
      },
    });
  }),
  getFilteredUsers: protectedProcedure
    .input(z.object({ query: z.string(), houseId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.user.findMany({
        where: {
          username: {
            startsWith: input.query,
            mode: "insensitive",
          },
          homes: {
            none: {
              id: input.houseId,
            },
          },
          invites: {
            none: {
              houseId: input.houseId,
            },
          },
          NOT: {
            id: ctx.session.user.id,
          },
        },
        take: 5,
      });
    }),
  getUserProfile: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        homes: {
          include: {
            chores: {
              where: {
                userId: ctx.session.user.id,
                completed: false,
              },
            },
          },
        },
      },
    });
  }),
  addUsername: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      const username = input.charAt(0).toUpperCase() + input.slice(1);
      return ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          username: username,
        },
      });
    }),
  getUserInvites: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.invite.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        house: {
          include: {
            admin: true,
          },
        },
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
  replyToInvite: protectedProcedure
    .input(z.object({ inviteId: z.string(), accepted: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { inviteId, accepted } = input;
      const invite = await ctx.prisma.invite.findUnique({
        where: {
          id: inviteId,
        },
        include: {
          house: true,
        },
      });

      if (!invite) {
        throw new Error("Invite not found");
      }

      if (accepted) {
        await ctx.prisma.house.update({
          where: {
            id: invite.houseId,
          },
          data: {
            members: {
              connect: {
                id: ctx.session.user.id,
              },
            },
          },
        });
      }

      await ctx.prisma.invite.delete({
        where: {
          id: inviteId,
        },
      });

      return invite;
    }),
});
