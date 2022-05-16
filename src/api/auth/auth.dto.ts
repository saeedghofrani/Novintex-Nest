import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ required: true, default: '1234' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: true, default: 'user' })
  @IsNotEmpty()
  name: string;
}
