import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';

export class AddProgramDescription {
  @ApiProperty({ example: 1 })
  @IsNumberString({ message: 'Program id must be a number' })
  programId: number;

  @ApiProperty({ example: 1 })
  @IsNumberString({ message: 'Rank must be a number' })
  rank: number;

  @ApiProperty({ example: JSON.stringify({ lang: 'A program description' }) })
  description: Object;
}
