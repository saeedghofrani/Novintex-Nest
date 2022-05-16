import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
    
    @ApiProperty({ default: 'user' })
    @IsString()
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ default: '1234' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ description: 'Valid email.', default: 'test@test.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

}

export class UpdateUserDto {

    @ApiProperty({ required: false })
    @IsOptional()
    name: string;

    @ApiProperty({ required: false })
    @IsOptional()
    password: string;

    @ApiProperty({ required: false, description: 'Valid email.' })
    @IsEmail()
    @IsOptional()
    email: string;

}