import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, ValidateIf } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class CreateProgram {
  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program name should be multi-lingual' })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Caption' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program caption should be multi-lingual' })
  caption: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program description should be multi-lingual' })
  description: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'iconFile',
  })
  iconFile: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program highlights' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program highlights should be multi-lingual' })
  highlights: object;

  @ApiProperty({
    type: String,
    example: 'https://www.example.com/icon.png',
    required: true,
  })
  @IsString({ message: 'Program application link must be a string' })
  @IsUrl(undefined, { message: 'Program application link must be a valid URL' })
  applicationLink: string;
}
