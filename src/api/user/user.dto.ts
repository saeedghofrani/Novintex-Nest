import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
    
    @ApiProperty({ default: 'user' })
    @IsString()
    @Length(3, 20)
    @IsNotEmpty()
    public name: string;

    @ApiProperty({ default: '1234' })
    @Length(8, 20)
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
    @Length(3, 20)
    name: string;

    @ApiProperty({ required: false })
    @Length(8, 20)
    @IsOptional()
    password: string;

    @ApiProperty({ required: false, description: 'Valid email.' })
    @IsEmail()
    @IsOptional()
    email: string;

}