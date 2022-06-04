import { ApiProperty } from '@nestjs/swagger';

export class ProgramCriterionResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  programId: number;

  @ApiProperty({ example: 1 })
  rank: number;

  @ApiProperty({ example: JSON.stringify({ lang: 'A program description' }) })
  description: Object;
}
