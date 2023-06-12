import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { ScoreModule } from './score/score.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';




@Module({
  imports: [UserModule, RolesModule, AuthModule, ScoreModule, PrismaModule, ConfigModule.forRoot({isGlobal: true})],

})
export class AppModule { }
