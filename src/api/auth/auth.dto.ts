import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LoginDto {

  @ApiProperty({ required: true, default: 'user' })
  @Length(3, 20)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ required: true, default: '1234' })
  @Length(8, 20)
  @IsNotEmpty()
  password: string;


}
