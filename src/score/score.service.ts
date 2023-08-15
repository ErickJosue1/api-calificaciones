import { Injectable } from '@nestjs/common';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


@Injectable()
export class ScoreService {

  async createGroupScores(groupId: number, subjectTeachers: { data: { subjectId: number; teacherId: string }[] }) {
    console.log(subjectTeachers)

    const group = await prisma.group.findUnique({
      where: { id: groupId },
      include: { User: true },
    });

    const scoresData: Prisma.ScoreCreateManyInput[] = [];

    for (const student of group.User) {
      for (const subjectTeacher of subjectTeachers.data) {
        const newData: Prisma.ScoreCreateManyInput = {
          studentId: student.id,
          professorId: +subjectTeacher.teacherId,
          groupID: groupId,
          subjectId: subjectTeacher.subjectId
        };

        scoresData.push(newData)
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
        else if (!score.gradeF) {
          gradingProgress = 4;
        }

        const updateData: Prisma.ScoreUpdateManyMutationInput = {
          grade1: gradingProgress == 1 ? grade : score.grade1,
          grade2: gradingProgress == 2 ? grade : score.grade2,
          grade3: gradingProgress == 3 ? grade : score.grade3,
          gradeF: gradingProgress == 4 ? (score.grade1 + score.grade2 + score.grade3) / 3
            : score.gradeF,
        };

        updatedScores.push(updateData);
      }
    }

    return prisma.score.updateMany({ where: { id: { in: scoreIds } }, data: updatedScores });
  }

  findAll() {
    return prisma.score.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} score`;
  }

  getStudentScores(id: number) {
    const current = prisma.score.findMany({
      where: {
        studentId: id,
        gradeF: null
      },
      include: {
        subject: true,
        professor: true
      },
    });

    const finsihed = prisma.score.findMany({
      where: {
        studentId: id,
        gradeF: {
          not: null
        }
      },
      include: {
        subject: true,
        professor: true
      },
    });

    return {
      current: current,
      finsihed: finsihed
    }

  }

  update(id: number, updateScoreDto: UpdateScoreDto) {
    return `This action updates a #${id} score`;
  }

  remove(id: number) {
    return `This action removes a #${id} score`;
  }
}
