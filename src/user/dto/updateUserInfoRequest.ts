import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';

export class UpdateUserInfoRequest {
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
