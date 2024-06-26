import { Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group, PrismaClient } from '@prisma/client';
import { Role } from '@prisma/client';
import { error } from 'console';

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

  async getAllGroupsByCareer(careerId: number): Promise<Group[]> {
    const career = await prisma.career.findUnique({
      where: { id: careerId },
      include: { groups: true },
    });

    if (!career) {
      throw error(`Career with id ${careerId} not found`);
    }

    return career.groups;
  }

  async getGroupStudents(groupId: number) {
    const career = await prisma.group.findUnique({
      where: { id: groupId },
      include: { User: true },
    });

    if (!career) {
      throw error(`Career with id ${groupId} not found`);
    }

    return career.User;
  }




  async getGroupSubjectsAndTeachers(groupId: number) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    const subjects = await prisma.subject.findMany({
      where: {
        period: group.period,
        careerId: group.careerId,
      },
    });

    const assignedTeachers = await prisma.score.findMany({
      where: {
        professorId: { not: undefined },
        student: {
          groupID: groupId,
        },
      },
      select: {
        subjectId: true,
        professor: {
          select: {
            id: true,
            firstName: true
          }
        }
      },
    });

    const availableTeachers = await prisma.user.findMany({
      where: {
        id: { notIn: assignedTeachers.map((teacher) => teacher.professor.id) },
        roleID: 2,
      },
      select: {
        id: true,
        firstName: true,
      },
    });

    const hasAssignedTeachers = assignedTeachers.length > 0;

    return {
      group,
      teachers: hasAssignedTeachers ? assignedTeachers : availableTeachers,
      subjects: subjects,
      isAssigned: hasAssignedTeachers ? true : false
    };
  }

  async getTeacherSubjectsAndGroups(id: number) {
    const groups = await prisma.group.findMany({
      where: {
        Score: {
          some: {
            professorId: id,
          },
        },
      },
    });

    return groups
  }

  findAll() {
    return prisma.group.findMany();
  }

  findOne(id: number) {
    return prisma.group.findUnique({ where: { id } });
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {

    return updateGroupDto.careerId > 15 ? error('Period cannot be grater than 15 (Depend of the career you may have made a mistake)') : prisma.group.update({
      where: { id }, data: {
        name: updateGroupDto.name,
        period: updateGroupDto.period,
        year: updateGroupDto.year,
        career: {
          connect: {
            id: updateGroupDto.careerId
          }
        }
      }
    });
  }

  remove(id: number) {
    return prisma.group.delete({ where: { id } });
  }
}
