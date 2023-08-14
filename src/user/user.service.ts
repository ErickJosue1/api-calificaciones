import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UpdateUserDto } from 'src/auth/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client'
import * as argon from 'argon2'
import { RolesGuard } from 'src/auth/guard/role.guard';
import axios from 'axios';


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async renapoService(curp: string) {
        try {
            const response = await axios.get(`https://curpws.bienestar.gob.mx/ServiceCurpPro/ConsultaPor/Curp/` + curp);

            const data = response.data;
          
            return data;
        } catch (error) {
            console.error(error);
            return 'no pasa we';

        }


    }

    async getUser(id: number) {
        const user = this.prisma.user.findUnique({
            where: {
                id: id
            }, include: { role: true },
        });

        delete (await user).hash;

        return user;
    }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany({ include: { role: true }, });
    }

    async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
        const { password } = dto;

        const hash = password ? await argon.hash(password) : null;

        const matricule = "000202020201";


        return hash ? this.prisma.user.update({
            where: { id }, data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                curp: dto.curp,
                matricule: matricule,
                hash,
                group: dto.group
                    ? {
                        connect: {
                            id: dto.group.id,
                        },
                    }
                    : undefined,
                role: {
                    connect: {
                        id: dto.role.id,
                    },
                },
            }
        }) : this.prisma.user.update({
            where: { id }, data: {
                email: dto.email,
                firstName: dto.firstName,
                lastName: dto.lastName,
                curp: dto.curp,
                matricule: matricule,
                group: dto.group
                    ? {
                        connect: {
                            id: dto.group.id,
                        },
                    }
                    : undefined,
                role: {
                    connect: {
                        id: dto.role.id,
                    },
                },
            }
        });
    }

    async deleteUser(id: number): Promise<void> {
        await this.prisma.user.delete({ where: { id } });
    }
}
