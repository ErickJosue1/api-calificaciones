import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto, SignInDto } from "./dto";
import * as argon from 'argon2'
import e from "express";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { Console } from "console";
import { Prisma, PrismaClient } from "@prisma/client";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) { }

    async signup(dto: AuthDto) {

        const hash = await argon.hash(dto.password);

        const matricule = "000202020201";

        console.log(dto)


        try {
            const user = await this.prisma.user.create({
                data: {
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
            });


            return this.signToken(user.id, user.email)
        } catch (error) {
            if (error.code == 'P2002') {
                throw new ForbiddenException(
                    'Credentials taken',
                )
            }
            throw error
        }
    }


    async signin(dto: SignInDto) {
        //find user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email,
            }
        });

        if (!user) throw new ForbiddenException('credentials incorrect')

        const pwMatches = await argon.verify(user.hash, dto.password);

        if (!pwMatches) throw new ForbiddenException('Wrong password')

        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string, user: object }> {
        const payload = {
            sub: userId,
            email
        }

        const secret = this.config.get('JWT_SECRET')

        const token = await this.jwt.signAsync(payload, {
            expiresIn: "60m",
            secret: secret
        })

        return {
            access_token: token,
            user: payload
        };
    }
}