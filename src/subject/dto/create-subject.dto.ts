import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateSubjectDto {
    @IsNotEmpty()
    name: string;

    @IsInt()
    period: number;

    @IsInt()
    careerId: number;
}
