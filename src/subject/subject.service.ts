import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { error } from 'console';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) { }

  async getAllSubjects() {
    return this.prisma.subject.findMany();
  }

  async createSubject(createSubjectDto: CreateSubjectDto) {
    return this.prisma.subject.create({
      data: createSubjectDto,
    });
  }

  async updateSubject(id: number, updateSubjectDto: UpdateSubjectDto) {
    const subject = await this.prisma.subject.findUnique({ where: { id } });
    if (!subject) {
      throw error(`Subject with id ${id} not found`);
    }
    return this.prisma.subject.update({
      where: { id },
      data: updateSubjectDto,
    });
  }

  async deleteSubject(id: number) {
    return this.prisma.subject.delete({ where: { id } });
  }
}
