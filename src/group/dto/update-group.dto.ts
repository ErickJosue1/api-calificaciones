import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupDto } from './create-group.dto';
import { IsString, IsNotEmpty, IsInt, Min } from 'class-validator';
import { Career } from '@prisma/client';


export class UpdateGroupDto extends PartialType(CreateGroupDto) {
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
    @Min(1900)
    @IsNotEmpty()
    year: number;
}
