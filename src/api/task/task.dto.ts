import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateTaskDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    @IsOptional()
    isCompleted: boolean;

}

export class ChangeIsCompletedTaskDto {

    @IsNotEmpty()
    isCompleted: boolean;

    @IsNotEmpty()
    @IsNumber()
    id: number;

}