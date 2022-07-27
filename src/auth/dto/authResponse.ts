import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthResponse {
  @ApiProperty({ required: true })
  @IsString({ message: 'token should be a string' })
  token: string;

  @ApiProperty({ required: true })
  @IsString({ message: 'name should be a string' })
  name: string;
}
