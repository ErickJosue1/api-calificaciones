import { PrismaClient } from '@prisma/client';
import * as argon from 'argon2'

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

  await seedSubjects();

  const hash = await argon.hash("12345");


  try {
     await prisma.user.create({
       data: {
         email: "tu_gfa_1166@hotmail.com",
         firstName: "I'm",
         lastName: "Admin",
         curp: "SAFD020411HMSNGVA5",
         matricule: "SAFD020411HMSNGVA5",
         hash,
         role: {
           connect: {
             id: 3,
           }
         }
       },
     })
   } catch (error) {
     if (error.code == 'P2002') {
       console.log(error)
     }
     throw error
   }
  

  for (const role of roles) {
    await prisma.role.create({ data: { name: role } });
  }
}

async function seedSubjects() {
  const subjectsData = [
    {
      name: 'Fundamentos de Ingeniería', period: 1, career: {
        connect: {
          id: 8,
        }
      }
    },
    {
      name: 'Álgebra Lineal', period: 1, career: {
        connect: {
          id: 8,
        }
      }
    },
    {
      name: 'Cálculo Diferencial', period: 1, career: {
        connect: {
          id: 8,
        }
      }
    },
    {
      name: 'Química', period: 1, career: {
        connect: {
          id: 8,
        }
      }
    },
    {
      name: 'Física', period: 1, career: {
        connect: {
          id: 8,
        }
      }
    },
    {
      name: 'Ortografía y Redacción', period: 1, career: {
        connect: {
          id: 8,
        }
      }
    },
    {
      name: 'Fundamentos de Ingeniería', period: 1, career: {
        connect: {
          id: 9,
        }
      }
    },
    {
      name: 'Álgebra Lineal', period: 1, career: {
        connect: {
          id: 9,
        }
      }
    },
    {
      name: 'Cálculo Diferencial', period: 1, career: {
        connect: {
          id: 9,
        }
      }
    },
    {
      name: 'Química', period: 1, career: {
        connect: {
          id: 9,
        }
      }
    },
    {
      name: 'Física', period: 1, career: {
        connect: {
          id: 9,
        }
      }
    },
    {
      name: 'Ortografía y Redacción', period: 1, career: {
        connect: {
          id: 9,
        }
      }
    },
  ];

  for (const subjectData of subjectsData) {
    await prisma.subject.create({ data: subjectData });
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
