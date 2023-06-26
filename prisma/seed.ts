import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const roles = ['STUDENT', 'TEACHER', 'ADMIN'];
  const careers = [
    'CONTADURÍA Y FINANZAS',
    'DERECHO',
    'DIRECCIÓN Y ADMINISTRACIÓN DE EMPRESAS',
    'PERIODISMO',
    'RELACIONES INDUSTRIALES',
    'PEDAGOGÍA',
    'INGENIERÍA INDUSTRIAL',
    'INGENIERÍA MECATRÓNICA',
    'INGENIERÍA EN SISTEMAS COMPUTACIONALES',
    'ARQUITECTURA',
    'DISEÑO GRÁFICO',
    'INFORMÁTICA',
    'MÉDICO CIRUJANO',
    'PSICOLOGÍA',
    'NUTRICIÓN',
    'GASTRONOMÍA',
    'CIENCIAS DE LA ACTIVIDAD FÍSICA Y PRÁCTICA DEPORTIVA',
  ];

  await seedCareers(careers);

  for (const role of roles) {
    await prisma.role.create({ data: { name: role } });
  }
}

async function seedCareers(careers): Promise<void> {
  for (const name of careers) {
    await prisma.career.create({
      data: {
        name,
      },
    });
  }
}


main()
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
