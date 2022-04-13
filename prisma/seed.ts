/**
 * Adds seed data to your db
 *
 * @link https://www.prisma.io/docs/guides/database/seed-database
 */
import { v4 } from 'uuid';
import { PrismaClient } from '@prisma/client';
import { sample, fake } from '../src/utils/fake';

const prisma = new PrismaClient();

async function main() {
  const bill = async () => {
    await prisma.bill.create({
      data: {
        id: v4(),
        amount: fake.amount(),
        vendor: {
          create: {
            id: v4(),
            accountId: sample.bytes(),
            name: fake.name(),
          },
        },
        dueOn: fake.date(),
      },
    });
  };
  await Promise.all(new Array(10).fill(1).map(() => bill()));
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
