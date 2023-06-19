import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['STUDENT', 'TEACHER', 'ADMIN'];
  
  for (const role of roles) {
    await prisma.role.create({ data: { name: role } });
  }
}

main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
