/**
 * Integration test example for the `bill` router
 */
import { createContextInner } from '../context';
import { appRouter } from './_app';
import { PortalPaymentService } from '~/server/service/payment';
import { prisma } from '~/server/prisma';
import { sample } from '~/utils/fake';

const getCreditMock = () =>
  jest.spyOn(PortalPaymentService.prototype, 'credit');

let creditSpy: ReturnType<typeof getCreditMock>;

beforeEach(() => {
  jest.clearAllMocks();
  creditSpy = getCreditMock();
});

test('list posts', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const list = await caller.query('bill.list');
  expect(list).not.toBe(null);
});

test.skip('pay bill', async () => {
  // create bill
  const bill = await prisma.bill.create({
    data: {
      amount: 100,
      dueOn: new Date(),
      status: 'NotPaid',
      vendor: {
        create: {
          name: 'Test',
          accountId: sample.bytes(),
        },
      },
    },
  });
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  // pay bill
  await caller.mutation('bill.pay', {
    billId: bill.id,
    accountId: 'something',
    amount: bill.amount,
  });

  expect(creditSpy).toHaveBeenCalledTimes(1);
});

test.skip('pay bill - race condition', async () => {
  // create bill
  const bill = await prisma.bill.create({
    data: {
      amount: 100,
      dueOn: new Date(),
      status: 'NotPaid',
      vendor: {
        create: {
          name: 'Test',
          accountId: sample.bytes(),
        },
      },
    },
  });
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  // pay bill "twice"
  const results = await Promise.allSettled([
    caller.mutation('bill.pay', {
      billId: bill.id,
      amount: bill.amount,
      accountId: 'fake',
    }),
    caller.mutation('bill.pay', {
      billId: bill.id,
      amount: bill.amount,
      accountId: 'fake',
    }),
  ]);

  // only 1 should succeed
  expect(creditSpy).toHaveBeenCalledTimes(1);
  expect(
    results.filter((result) => result.status === 'fulfilled'),
  ).toHaveLength(1);
});
