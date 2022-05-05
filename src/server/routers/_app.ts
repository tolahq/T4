/**
 * DO NOT MODIFY THIS FILE.
 */
import { createRouter } from '../createRouter';
import { billRouter } from './bill';
import superjson from 'superjson';

export const appRouter = createRouter()
  .transformer(superjson)
  /**
   * Add a health check endpoint to be called with `/api/trpc/healthz`
   */
  .query('healthz', {
    async resolve() {
      return 'yay!';
    },
  })
  .merge('bill.', billRouter);

export type AppRouter = typeof appRouter;
