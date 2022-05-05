# Tola | T4

Welcome to the Terrific Tola Takehome Test (T4)! We've provided you with a basic
application which scaffolds the worlds most basic payment service. We've
partnered with the Portal Payment Platform (P3) which enables unlimited global
payments at no cost to us. As a result, you don't have to worry about balances,
debit operations, transfering funds, or any other complex operations that depend
on distributed state. Every payment operation is instantaneous and synchronous.

Your goal is to integrate P3[^1] into the codebase so that people can pay their
Bills. If you load up the application you'll see a basic page that lists bills.
Find a way to add a bill payment button to the application that pays the correct
amount through P3. P3 has unlimited funds, but their founders are pretty picky
about abuse, so it's important to only pay the amount listed on the bill. The
applications database should persist that a payment took place.

Please also add tests to make sure that our customers don't have a bad
experience as we tend to refactor pretty aggressively. Please read through the
[Guidance](#guidance) section before proceeding.

[^1]: Located in `src/server/service/payment.ts`

## Getting Started

**Requirements**

- Node >= 14
- Docker which runs Postgres - _feel free to edit `.env` to remove the
  dependency on Docker and connect to your own_

```bash
git clone git@github.com:tolahq/t4.git
npm install
cp .env.example .env # and edit if needed
npm run db-up # starts Postgres, migrates db and adds seed data
npm run dev # starts the app, go to http://localhost:3000
```

**Notes**

As long as `npm run dev` is running, your changes will be visible on
http://localhost:3000 live, no need to restart your server.

## Guidance

- Please do not modify the linting rules in your main PR. If you have
  suggestions or opinions on how to improve DX please do so in a comment or
  along side your submission. We review the changes against the main repository
  or base commit in this repo.

## FAQ

#### What stack are we using?

This application is built using a combination of Next.js, React, tRPC, and
Prisma. We use Playwright for browser driven tests, jest for other tests, and
tailwind as a UI library.

- https://nextjs.org
- https://reactjs.org
- https://trpc.io
- https://prisma.io

#### What does command `X` do?

```bash
npm run build      # runs `prisma generate` + `prisma migrate` + `next build`
npm run db-reset   # resets local db based on `/.env`
npm run dev        # starts next.js
npm run db-up      # starts postgres db + runs migrations + seeds + starts next.js
npm run test-dev   # runs e2e tests on dev
npm run test-start # runs e2e tests on `next start` - build required before
npm run test:unit  # runs normal jest unit tests
npm run test:e2e   # runs e2e tests
```

#### What files should I focus on?

- src/server/routers/bill.ts
- src/server/routers/bill.test.ts
- src/pages/index.tsx
- src/pages/bill/[id].tsx
- src/components/\*

