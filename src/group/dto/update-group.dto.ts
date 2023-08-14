import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Career } from '@prisma/client';


export class UpdateGroupDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsInt()
    @IsNotEmpty()
    careerId: number;
  
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    period: number;
  
    @IsInt()
    @Min(1900)
    @IsNotEmpty()
    year: number;
}
