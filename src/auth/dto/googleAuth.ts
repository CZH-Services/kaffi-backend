import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GoogleAuthentication {
  @ApiProperty({ required: true })
  @IsString({ message: 'token should be a string' })
  accessToken: string;
}
