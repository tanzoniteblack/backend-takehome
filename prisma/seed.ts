import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  const userInserts = new Array(10).fill(0).map(() =>
    prisma.user.create({
      data: {
        name: faker.name.fullName(),
        email: faker.internet.email(),
      },
    }),
  );
  const users = await prisma.$transaction(userInserts);

  const documentInserts = users.map((user) => {
    return prisma.document.create({
      data: {
        title: faker.lorem.sentence(),
        text: faker.lorem.paragraph(),
        userId: user.id,
      }
    })
  })

  await prisma.$transaction(documentInserts);
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
