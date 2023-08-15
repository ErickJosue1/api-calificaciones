import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


@Injectable()
export class ScoreService {

  async createGroupScores(groupId: number, subjectTeachers: { subjectId: number; teacherId: number }[]) {
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { User: true },
    });

    const scoresData = [];

    for (const student of group.User) {
      for (const subjectTeacher of subjectTeachers) {
        scoresData.push({
          studentId: student.id,
          professorId: subjectTeacher.teacherId,
          subjectId: subjectTeacher.subjectId,
        });
      }
    }

    return prisma.score.createMany({ data: scoresData });
  }

  async getStudentsScoresForGroupAndSubject(groupId: number, subjectId: number) {
    return prisma.score.findMany({
      where: {
        groupID: groupId,
        subjectId: subjectId,
      },
      include: {
        student: true,
      },
    });
  }



  async updateStudentScores(groupScores: { scoreId: number; grade: number }[]) {
    const updatedScores: Prisma.ScoreUpdateManyMutationInput[] = [];
    const scoreIds = groupScores.map((scoreData) => scoreData.scoreId);

    for (const gradeData of groupScores) {
      const { scoreId, grade } = gradeData;
      const score = await prisma.score.findUnique({ where: { id: scoreId } });

      if (score) {
        let gradingProgress = 1;

        if (!score.grade1) {
          gradingProgress = 1;
        } else if (!score.grade2) {
          gradingProgress = 2;
        } else if (!score.grade3) {
          gradingProgress = 3;
        }

        const updateData: Prisma.ScoreUpdateManyMutationInput = {
          grade1: gradingProgress == 1 ? grade : score.grade1,
          grade2: gradingProgress == 2 ? grade : score.grade2,
          grade3: gradingProgress == 3 ? grade : score.grade3,
        };

        updatedScores.push(updateData);
      }
    }

    return prisma.score.updateMany({ where: { id: { in: scoreIds } }, data: updatedScores });
  }

  findAll() {
    return `This action returns all score`;
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  getStudentScores(id: number) {
    return prisma.score.findMany({
      where: {
        studentId: id
      },
      include: {
        subject: true,
        professor: true
      },
    });
  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
