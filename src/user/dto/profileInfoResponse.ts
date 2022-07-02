import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsNumber } from 'class-validator';

export class ProfileInfoResponse {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'admin@hotmail.com', required: true })
  @IsEmail({ message: 'Email should be a valid email' })
  email: string;

  @ApiProperty({ example: 'zeinab', required: true })
  @IsString({ message: 'first name should be a string' })
  firstName: string;

  @ApiProperty({ example: 'zeitoun', required: true })
  @IsString({ message: 'last name should be a string' })
  lastName: string;

  @ApiProperty({ example: 'USA', required: true })
  @IsOptional()
  @IsString({ message: 'location should be a string' })
  location: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'profile',
  })
  @IsOptional()
  @IsString({ message: 'profile url should be a string' })
  profile: string;
}
