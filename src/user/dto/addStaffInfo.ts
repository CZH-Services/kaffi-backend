import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class AddStaffInfo {
  @ApiProperty({ example: 1, required: true })
  @IsNumber()
  id: number;

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
