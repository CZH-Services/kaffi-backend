import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddProgramCriteria {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Criterion description' }),
    required: true,
  })
  description: Object;
}
