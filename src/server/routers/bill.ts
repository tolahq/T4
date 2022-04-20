import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { createRouter } from '~/server/createRouter';
import { prisma } from '~/server/prisma';

const defaultVendorSelect = Prisma.validator<Prisma.VendorSelect>()({
  id: true,
  createdAt: true,
  updatedAt: true,
  name: true,
});

/**
 * Default selector for Bill.
 * It's important to always explicitly say which fields you want to return in
 * order to not leak extra information
 * @see https://github.com/prisma/prisma/issues/9353
 */
const defaultBillSelect = Prisma.validator<Prisma.BillSelect>()({
  id: true,
  amount: true,
  status: true,
  dueOn: true,
  createdAt: true,
  updatedAt: true,
  vendor: {
    select: defaultVendorSelect,
  },
});

export const postRouter = createRouter()
  // create
  .query('list', {
    async resolve() {
      /**
       * For pagination you can have a look at this docs site
       * @link https://trpc.io/docs/useInfiniteQuery
       */

      return await prisma.bill.findMany({
        select: defaultBillSelect,
      });
    },
  })
  .query('info', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      const bill = await prisma.bill.findUnique({
        where: { id },
        select: defaultBillSelect,
      });
      if (!bill) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `No bill with id '${id}'`,
        });
      }
      return bill;
    },
  })
  .mutation('pay', {
    input: z.object({
      billId: z.string(),
    }),
    async resolve({ input }) {
      // TODO: Implement this function.
      throw new TRPCError({
        code: 'METHOD_NOT_SUPPORTED',
        message: 'not supported',
      });
    },
  })
  .mutation('delete', {
    input: z.object({
      id: z.string(),
    }),
    async resolve({ input }) {
      const { id } = input;
      await prisma.bill.delete({ where: { id } });
      return {
        id,
      };
    },
  });
