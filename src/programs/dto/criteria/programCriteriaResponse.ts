import { ApiProperty } from '@nestjs/swagger';

export class ProgramCriterionResponse {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({ type: Number, example: 1 })
  programId: number;

  @ApiProperty({ type: Number, example: 1 })
  rank: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'A program description' }),
  })
  description: Object;
}
