import { Group } from '@prisma/client';
import { Role } from '@prisma/client';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsEnum,
    IsOptional
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    group: Group;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    curp: string;


    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    role: Role;
}
