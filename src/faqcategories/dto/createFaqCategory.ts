import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class createFaqCategory {
  @ApiProperty({
    example: { en: 'Volunteering' },
    required: true,
  })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  @IsMultiLingual({ message: 'Category name should be multi-lingual' })
  readonly name: JSON;
}
