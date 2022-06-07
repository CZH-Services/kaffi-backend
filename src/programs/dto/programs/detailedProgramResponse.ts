import { ApiProperty } from '@nestjs/swagger';
import { ProgramDescription } from 'src/programs/entities/programDescription';
import { ProgramCriterionResponse } from '../criteria/programCriteriaResponse';
import { ProgramCycleResponse } from '../cycles/programCycleResponse';

export class DetailedProgramResponse {
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
  hightlights: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
  })
  programDescriptions: ProgramDescription[];

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
  })
  programCriteria: ProgramCriterionResponse[];

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program criteria description' }),
  })
  cycle: ProgramCycleResponse;
}
