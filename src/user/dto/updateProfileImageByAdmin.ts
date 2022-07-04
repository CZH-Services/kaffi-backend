import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateProfileImageByAdmin {
  @ApiProperty({ example: 'example@gmail.com' })
  @IsEmail({ message: 'email must be a valid email' })
  email: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'profile',
  })
  profile: Object;
}
