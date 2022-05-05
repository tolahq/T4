/**
 * Integration test example for the `bill` router
 */
import { createContextInner } from '../context';
import { appRouter } from './_app';
import { PortalPaymentService } from '~/server/service/payment';
import { prisma } from '~/server/prisma';
import { sample } from '~/utils/fake';
jest.mock('~/server/service/payment');

beforeEach(() => {
  jest.resetAllMocks();
});

test('list posts', async () => {
  const ctx = await createContextInner({});
  const caller = appRouter.createCaller(ctx);

  const list = await caller.query('bill.list');
  expect(list).not.toBe(null);
});

test.skip('pay bill', async () => {
  const serviceMock =
    PortalPaymentService as any as jest.Mock<PortalPaymentService>;
  expect(serviceMock).not.toHaveBeenCalled();

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

  expect(serviceMock.mock.instances.length).toBeGreaterThanOrEqual(1);
  const instance = serviceMock.mock.instances[0];
  if (!instance) {
    fail('no mocked instance');
  }
  expect(instance.credit).toHaveBeenCalledTimes(1);
});

test.skip('pay bill - race condition', async () => {
  const serviceMock =
    PortalPaymentService as any as jest.Mock<PortalPaymentService>;

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
  const instance = serviceMock.mock.instances[0]!;
  expect(instance.credit).toHaveBeenCalledTimes(1);

  expect(results).toMatchInlineSnapshot(`
    Array [
      Object {
        "status": "fulfilled",
        "value": null,
      },
      Object {
        "reason": [TRPCError: Bill already paid],
        "status": "rejected",
      },
    ]
  `);
});
