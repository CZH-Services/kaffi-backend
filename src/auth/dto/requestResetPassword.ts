import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestResetPassword {
  @ApiProperty({
    type: String,
    format: 'email',
    example: 'hussein-khamis@hotmail.com',
    required: true,
  })
  @IsEmail({ message: 'Email is not valid' })
  email: string;
}
