import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Career } from '@prisma/client';


export class CreateGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    career: Career;
  
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    period: number;
  
    @IsInt()
    @Min(1990)
    @IsNotEmpty()
    year: number;
}
