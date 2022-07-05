import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class CreateNonStaff {
  @ApiProperty({ example: 'admin@hotmail.com', required: true })
  @IsEmail({ message: 'Email should be a valid email' })
  email: string;

  @ApiProperty({ example: 'zeinab', required: true })
  @IsString({ message: 'first name should be a string' })
  firstName: string;

  @ApiProperty({ example: 'zeitoun', required: true })
  @IsString({ message: 'last name should be a string' })
  lastName: string;

  @ApiProperty({ example: '123456', required: true })
  @ValidateIf((o) => !o.authWithGoogle || o.password)
  @IsString({ message: 'Password should be a string' })
  password: string;

  @ApiProperty({ example: 'USA', required: true })
  @IsOptional()
  @IsString({ message: 'location should be a string' })
  location: string;
}
