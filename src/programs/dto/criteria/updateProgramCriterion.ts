import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class UpdateProgramCriterion {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  id: number;

  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Rank must be a number' })
  rank: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'A criterion description' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Criterion description should be multi-lingual' })
  description: Object;
}
