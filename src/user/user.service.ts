import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client'
import * as argon from 'argon2'
import { RolesGuard } from 'src/auth/guard/role.guard';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany({ include: { role: true }, });
    }

    async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const { firstName, password } = updateUserDto;
        const hash = await argon.hash(password);

        return this.prisma.user.update({ where: { id }, data: { firstName, hash } });
    }

    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}
