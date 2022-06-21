import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class updateFaqCategory {
  @ApiProperty({ example: 20, required: true })
  @IsInt({ message: 'Please enter a valid id' })
  readonly id: number;

  @ApiProperty({
    example: { en: 'Volunteering' },
    required: true,
  })
  @IsNotEmpty({ message: "Name shouldn't be empty" })
  @IsMultiLingual({ message: 'Category name should be multi-lingual' })
  readonly name: JSON;

  @ApiProperty({
    example: 3,
    required: true,
  })
  @IsInt({ message: 'Rank should be a number' })
  @IsNotEmpty({ message: "Rank shouldn't be empty" })
  readonly rank: Number;
}
