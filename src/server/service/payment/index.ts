/**
 * DO NOT MODIFY THIS FILE.
 *
 * Welcome to the Portal Payment Platform or P3. P3 sources all of its funds
 * through a portal to a parallel dimension where money actually grows on trees.
 * As a result, you never have to worry about balances or running out of money.
 * You can send money anywhere with a single simple API call to P3. Just provide
 * the global account ID of the recipient and the amount in USD (yes!) and P3
 * will automatically route you the funds instantaneously. It's that easy!
 */

import { v4 } from 'uuid';

export interface Payment {
  id: string;
  amount: number;
  status: 'ok';
  createdOn: Date;
}

/**
 * PortalPaymentService is a class you can instantiate in order to perform
 * credit operations to accounts. It only provides credit operations at this
 * time.
 */
export class PortalPaymentService {
  constructor() {
    //
  }

  async credit(opts: { vendorId: string; amount: number }) {
    return {
      id: v4(),
      amount: opts.amount,
      status: 'ok' as const,
      createdOn: new Date(),
    };
  }
}
