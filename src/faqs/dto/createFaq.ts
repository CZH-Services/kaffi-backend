import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class CreateFaq {
  @ApiProperty({
    example: { en: 'How does volunteering work?' },
    required: true,
  })
  @IsNotEmpty({ message: "Question shouldn't be empty" })
  @IsMultiLingual({ message: 'Question should be multi-lingual' })
  readonly question: JSON;

  @ApiProperty({
    example: { en: 'You start by applying, then we get back to you' },
  })
  @IsNotEmpty({ message: "Answer shouldn't be empty" })
  @IsMultiLingual({ message: 'Answer should be multi-lingual' })
  readonly answer: JSON;

  @ApiProperty({
    example: 23432,
    required: true,
  })
  @IsNotEmpty({ message: "Category ID shouldn't be empty" })
  readonly category_id: Number;
}
