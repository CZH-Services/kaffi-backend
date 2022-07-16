import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';
export class GetBlogResponse {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  id: number;

  @ApiProperty({ example: { en: 'Blog Title', de: 'Blog Title de' } })
  @IsMultiLingual({ message: 'Blog Title must be multilingual' })
  @IsNotEmpty({ message: 'title is required' })
  title: object;

  @ApiProperty({ example: { en: 'Blog Summary', de: 'Blog Summary de' } })
  @IsMultiLingual({ message: 'Blog Summary must be multilingual' })
  @IsNotEmpty({ message: 'summary is required' })
  summary: object;

  @ApiProperty({ example: 'Blog Image' })
  @IsNotEmpty({ message: 'image is required' })
  image: string;

  @ApiProperty({ example: '2020-01-01' })
  @IsNotEmpty({ message: 'date is required' })
  date: Date;

  @ApiProperty({
    example:
      'https://drive.google.com/file/d/1tDlbVR9JDEDhB_lL-aprjeK11iAalaIR/view',
  })
  @IsOptional()
  externalLink: string;
}
