import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class CreateStaff {
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

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'profile',
  })
  @ApiProperty({ example: 'Member', required: true })
  @IsString({ message: 'tag should be a string' })
  tag: string;

  @ApiProperty({
    example: { en: 'President', de: 'Präsidentin' },
    required: true,
  })
  @IsMultiLingual({ message: 'title must be multi-lingual' })
  title: object;
}