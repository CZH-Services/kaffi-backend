import { ApiProperty } from '@nestjs/swagger';

export class ProgramDescriptionResponse {
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
