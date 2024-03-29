import { ApiProperty } from '@nestjs/swagger';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';
import { IsInt, IsNotEmpty } from 'class-validator';

export class UpdateFaq {
  @ApiProperty({ example: 20, required: true })
  @IsInt({ message: 'Please enter a valid id' })
  readonly id: number;

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
    example: 3,
    required: true,
  })
  @IsInt({ message: 'Rank should be a number' })
  @IsNotEmpty({ message: "Rank shouldn't be empty" })
  readonly rank: Number;

  @ApiProperty({
    example: 'asddfs32',
    required: true,
  })
  @IsNotEmpty({ message: "Category ID shouldn't be empty" })
  readonly category_id: Number;
}
