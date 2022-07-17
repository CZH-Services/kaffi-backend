import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateIf,
} from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class AddBlogRequest {
  @ApiProperty({ example: { en: 'Blog Title', de: 'Blog Title de' } })
  @IsMultiLingual({ message: 'Blog Title must be multilingual' })
  @IsNotEmpty({ message: 'title is required' })
  title: object;

  @ApiProperty({ example: { en: 'Blog Summary', de: 'Blog Summary de' } })
  @IsMultiLingual({ message: 'Blog Summary must be multilingual' })
  @IsNotEmpty({ message: 'summary is required' })
  summary: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'image',
  })
  image: string;

  @ApiProperty({ example: '2020-01-01', type: Date })
  @IsNotEmpty({ message: 'date is required' })
  @IsDateString({ message: 'date should be a valid date' })
  date: Date;

  @ApiProperty({
    required: false,
    example:
      'https://drive.google.com/file/d/1tDlbVR9JDEDhB_lL-aprjeK11iAalaIR/view',
  })
  @IsOptional()
  @ValidateIf((o) => !o.HTMLString || o.externalLink)
  @IsString({ message: 'externalLink should be a string' })
  externalLink: string;

  @ApiProperty({
    required: false,
    example: {
      en: '<div>html string here</div>',
      de: '<div>html string here</div>',
    },
  })
  @ValidateIf((o) => !o.externalLink || o.HTMLString)
  @IsOptional()
  @IsMultiLingual({ message: 'HTMLString must be multilingual' })
  HTMLString: object;
}
