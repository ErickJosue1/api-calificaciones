import { Injectable } from '@nestjs/common';
import { CreateCareerDto } from './dto/create-career.dto';
import { UpdateCareerDto } from './dto/update-career.dto';
import { PrismaService } from 'src/prisma/prisma.service';


@Injectable()
export class CareerService {
    constructor(private prisma: PrismaService) { }

  create(createCareerDto: CreateCareerDto) {
    return this.prisma.career.create({ data: createCareerDto });
  }

  findAll() {
    return this.prisma.career.findMany();
  }

  findOne(id: number) {
    return this.prisma.career.findUnique({ where: { id } });
  }

  update(id: number, updateCareerDto: UpdateCareerDto) {
    return this.prisma.career.update({ where: { id }, data: updateCareerDto });
  }

  remove(id: number) {
    return this.prisma.career.delete({ where: { id } });
  }
}
