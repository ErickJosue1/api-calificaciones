import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCareerDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}
