import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RolesController],
  providers: [PrismaService],
})
export class RolesModule {}
