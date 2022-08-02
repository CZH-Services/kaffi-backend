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

  @ApiProperty({ example: 'USA', required: true })
  @IsOptional()
  @IsString({ message: 'location should be a string' })
  location: string;

  @ApiProperty({ example: 'Member', required: true })
  @IsString({ message: 'tag should be a string' })
  tag: string;

  @ApiProperty({
    example: { en: 'President', de: 'Präsidentin' },
    required: true,
  })
  @IsOptional()
  @IsMultiLingual({ message: 'title must be multi-lingual' })
  title: object;
}
