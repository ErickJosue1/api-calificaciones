import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { IsNotEmpty, IsInt } from 'class-validator';


export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {
    @IsNotEmpty()
    name: string;

    @IsInt()
    period: number;
}
