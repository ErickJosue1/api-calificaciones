import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { score } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('scores')
export class ScoreController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async getAllScores(): Promise<score[]> {
    return this.prismaService.score.findMany();
  }

  @Get(':id')
  async getScoreById(@Param('id') id: number): Promise<score> {
    return this.prismaService.score.findUnique({
      where:{
        
      },
    });
  }

  @Post()
  async createScore(@Body() score: score): Promise<score> {
    return this.prismaService.score.create({
      data: score,
    });
  }
  
  @Put(':id')
  async updateScore(@Param('id') id: number, @Body() score: score): Promise<score> {
    return this.prismaService.score.update({
      where: {  },

      data: score,
    });
  }

  @Delete(':id')
  async deleteScore(@Param('id') id: number): Promise<score> {
    return this.prismaService.score.delete({
      where: {  },
    });
  }
}
