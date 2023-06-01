import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import superjson from "superjson";

import { appRouter } from "@acme/api";
import { prisma } from "@acme/db";

export const generateSSGHelper = () =>
  createProxySSGHelpers({
    router: appRouter,
    ctx: {
      prisma,
      session: null,
    },
    transformer: superjson,
  });
