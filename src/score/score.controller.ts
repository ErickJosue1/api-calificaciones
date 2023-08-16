import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Req } from '@nestjs/common';
import { ScoreService } from './score.service';
import { CreateScoreDto } from './dto/create-score.dto';
import { UpdateScoreDto } from './dto/update-score.dto';
import { Score, User } from '@prisma/client';

interface RequestWithUser extends Request {
  user: User;
}

@Controller('score')
export class ScoreController {
  constructor(private readonly scoreService: ScoreService) { }


  @Post(':groupId/createScores')
  async createGroupScores(@Param('groupId') groupId: string, @Body() subjectTeachers: { data: { subjectId: number; teacherId: string }[] }) {
    return this.scoreService.createGroupScores(+groupId, subjectTeachers);
  }

  @Put(':groupId/students/scores')
  async updateStudentScores(@Body() groupScores: { scoreId: number; grade: number }) {
    return this.scoreService.updateStudentScores(groupScores);
  }

  @Get()
  findAll() {
    return this.scoreService.findAll();
  }

  @Get('teacher/:teacherId/groupscores/:id')
  getTeacherStudentsScore(@Param('id') id: string, @Param('teacherId') teacherId: string) {

    console.log(teacherId, '+', id)

    return this.scoreService.getTeacherStudentsRecords(+teacherId, +id);
  }


  @Get(':id/student')
  getStudentScores(@Param('id') id: string) {
    return this.scoreService.getStudentScores(+id);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoreService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateScoreDto: UpdateScoreDto) {
    return this.scoreService.update(+id, updateScoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.scoreService.remove(+id);
  }

  //p
}
