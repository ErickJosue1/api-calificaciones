import { User } from '@prisma/client';
import { Role } from '@prisma/client';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    IsEnum 
} from 'class-validator';



export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    curp: string;

    @IsString()
    @IsNotEmpty()
    matricule: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    role: Role;
}

export class UpdateUserDto {

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    curp: string;

    @IsString()
    @IsNotEmpty()
    matricule: string;

    @IsNotEmpty()
    role: Role;
}