import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class UpdateUserInfoRequestByAdmin {
  @ApiProperty({ example: 'test@example.com' })
  @IsEmail({ message: 'Email should be a valid email' })
  email: string;

  @ApiProperty({ example: 'zeinab', required: true })
  @IsString({ message: 'first name should be a string' })
  firstName: string;

  @ApiProperty({ example: 'zeitoun', required: true })
  @IsString({ message: 'last name should be a string' })
  lastName: string;

  @ApiProperty({ example: 'USA', required: true })
  @IsString({ message: 'location should be a string' })
  location: string;
}
