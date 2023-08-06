import { PartialType } from '@nestjs/mapped-types';
import { CreateCareerDto } from './create-career.dto';
import { IsString, IsNotEmpty } from 'class-validator';


export class UpdateCareerDto extends PartialType(CreateCareerDto) {
    @IsString()
    @IsNotEmpty()
    name: string;
}
