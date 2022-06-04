import { ApiProperty } from '@nestjs/swagger';

export class ProgramResponse {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
  })
  name: Object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
  })
  description: Object;

  @ApiProperty({ type: String, example: 'https://www.example.com/icon.png' })
  icon: string;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program highlights' }),
  })
  highlights: Object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program criteria description' }),
  })
  criteriaDescription: Object;
}
