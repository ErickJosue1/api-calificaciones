import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { Score } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('scores')
export class ScoreController {
  constructor(private readonly prismaService: PrismaService) { }

  @Get()
  async getAllScores(): Promise<Score[]> {
    return this.prismaService.score.findMany();
  }

  @Get(':id')
  async getScoreById(@Param('id') id: number): Promise<Score> {
    return this.prismaService.score.findUnique({
      where: {

      },
    });
  }

  @Post()
  async createScore(@Body() score: Score): Promise<Score> {
    return this.prismaService.score.create({
      data: score,
    });
  }

  @Put(':id')
  async updateScore(@Param('id') id: number, @Body() score: Score): Promise<Score> {
    return this.prismaService.score.update({
      where: {},

      data: score,
    });
  }

  @Delete(':id')
  async deleteScore(@Param('id') id: number): Promise<Score> {
    return this.prismaService.score.delete({
      where: {},
    });
  }
}
