import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  isJSON,
  IsJSON,
  isNotEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreateFaq {
  @ApiProperty({
    example: { en: 'How does volunteering work?' },
    required: true,
  })
  @IsNotEmpty({ message: "Question shouldn't be empty" })
  readonly question: JSON;

  @ApiProperty({
    example: { en: 'You start by applying, then we get back to you' },
  })
  @IsNotEmpty({ message: "Answer shouldn't be empty" })
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
