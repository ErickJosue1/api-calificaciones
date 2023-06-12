import{
    IsEmail,
    IsNotEmpty,
    IsString
} from 'class-validator';

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
}

export class UpdatePasswordDto {

    @IsNotEmpty()
    @IsString() 
    new_password: string;

    @IsNotEmpty()
    @IsString() 
    old_password: string;

}