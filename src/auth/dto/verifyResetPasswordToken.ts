import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class VerifyResetPasswordToken {
  @ApiProperty({
    type: String,
    example: 'Some long token..',
    required: true,
  })
  @IsString({ message: 'Token must be a string' })
  token: string;
}
