import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserProfileImage {
  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'profile',
  })
  profile: Object;
}
