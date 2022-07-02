import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsString,
  ValidateIf,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class UserResponse {
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

  @ApiProperty({ required: true })
  @ValidateIf((o) => !o.authWithGoogle || o.password)
  @IsString({ message: 'passowrd should be a string' })
  password: string;

  @ApiProperty({ example: false, required: true })
  @IsBoolean({ message: 'authWithGoogle shoulb a boolean' })
  authWithGoogle: boolean;

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
