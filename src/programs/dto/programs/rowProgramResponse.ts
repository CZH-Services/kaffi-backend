import { ApiProperty } from '@nestjs/swagger';
import { ProgramCycleResponse } from '../cycles/programCycleResponse';

export class RowProgramResponse {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
  })
  name: object;

  @ApiProperty({ type: String, example: 'https://www.example.com/icon.png' })
  icon: string;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Caption' }),
  })
  caption: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
  })
  description: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program criteria description' }),
  })
  cycle: ProgramCycleResponse;
}
