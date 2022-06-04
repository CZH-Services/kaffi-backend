import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateProgramCriterion {
  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  id: number;

  @ApiProperty({ example: 1, required: true })
  @IsInt({ message: 'Rank must be a number' })
  rank: number;

  @ApiProperty({
    example: JSON.stringify({ lang: 'A criterion description' }),
    required: true,
  })
  description: Object;
}
