import { User } from '@prisma/client';
import{
    IsEmail,
    IsNotEmpty,
    IsString
} from 'class-validator';
import { Role } from '@prisma/client' 

export class AuthDto{
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
    password: string;

    @IsString()
    @IsNotEmpty()
    role: Role;
}

export class UpdateUserDto  {

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
    role: Role;
}