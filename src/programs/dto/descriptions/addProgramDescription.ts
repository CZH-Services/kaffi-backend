import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class AddProgramDescription {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({ type: Number, example: 1, required: true })
  @IsInt({ message: 'Rank must be a number' })
  rank: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'A program description' }),
    required: true,
  })
  description: Object;
}
