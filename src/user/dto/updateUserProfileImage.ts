import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileImage {
  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'profile',
  })
  profile: Object;
}
