import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class ResetPassword {
  @ApiProperty({
    description: 'New password',
    example: 'P@ssw0rd123',
    required: true,
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;

  @ApiProperty({
    description: 'Token',
    example: 'Some long token string',
    required: true,
  })
  @IsString({ message: 'Token is not a string' })
  @IsNotEmpty({ message: 'Token is required' })
  token: string;
}
