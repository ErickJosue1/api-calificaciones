import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class GroupService {
  create(createGroupDto: CreateGroupDto) {
    return prisma.group.create({
      data: {
        name: createGroupDto.name,
        period: createGroupDto.period,
        year: createGroupDto.year,
        career: {
          connect: {
            id: createGroupDto.career.id
          }
        }
      }
    });
  }

  async verifySubjects(id: number) {
    const group = prisma.group.findUnique({ where: { id } })

    try {
      const students = prisma.user.findMany({
        where: {
          groupID: group['id']
        }
      })

      const subjects = prisma.subject.findMany({
        where: {
          AND: [
            { careerId: group['careerId'] },
            { period: group['period'] }
          ]
        }
      })

      console.log(students, subjects);

      let count: number = 0;

      //if it finds that the admin has already assigned the teachers it return the subjects and the 
      //corresponding teachers. Otherwise it returns the subjects and all the teachers

      const found = await prisma.score.count({ where: { AND: [{ groupID: id }, { subjectId: subjects[0].id }] } });

      if (found > 0) {

        const teachers = []

        Object.entries(subjects).forEach(([key, value]) => {
          let t = prisma.score.findFirst({ where: { AND: [{ groupID: id }, { subjectId: value.id }] } })['professorId']
          teachers.push(prisma.user.findUnique({ where: { id: t } }))
        })

        return {
          subjects: subjects,
          teachers: teachers
        }
      }

      return {
        subjects: subjects,
        teachers: prisma.user.findMany({ where: { AND: [{ roleID: 2 }] } })
      }
    }
    catch (e) {
      console.log(e)
      return e;
    }

  }

  teacherSubjects(id: number) {

    const groups = []
    let t = prisma.score.findFirst({ where: { AND: [{ groupID: id }, { subjectId: value.id }] } })

    Object.entries(subjects).forEach(([key, value]) => {
      if (groups.length) {

      }
      else {
        groups.push(prisma.user.findUnique({ where: { id: t } }))
      }

    })

    

    return groups
  }

  findAll() {
    return prisma.group.findMany();
  }

  findOne(id: number) {
    return prisma.group.findUnique({ where: { id } });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return prisma.group.update({
      where: { id }, data: {
        name: updateGroupDto.name,
        period: updateGroupDto.period,
        year: updateGroupDto.year,
        career: {
          connect: {
            id: updateGroupDto.career.id
          }
        }
      }
    });
  }

  remove(id: number) {
    return prisma.group.delete({ where: { id } });
  }
}
