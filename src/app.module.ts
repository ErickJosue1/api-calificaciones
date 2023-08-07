import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { SubjectModule } from './subject/subject.module';
import { CareerModule } from './career/career.module';
import { GroupModule } from './group/group.module';
import { ScoreModule } from './score/score.module';




@Module({
  imports: [UserModule, RolesModule, AuthModule, ScoreModule, PrismaModule, ConfigModule.forRoot({isGlobal: true}), SubjectModule, CareerModule, GroupModule],

})
export class AppModule { }
