import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {

  @ApiProperty({ required: true, default: 'user' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, default: '1234' })
  @IsNotEmpty()
  password: string;


}
