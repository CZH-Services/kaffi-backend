import { ApiProperty } from '@nestjs/swagger';

export class CreateProgram {
  @ApiProperty({ example: JSON.stringify({ lang: 'Computer Science' }) })
  name: Object;

  @ApiProperty({ example: JSON.stringify({ lang: 'Program description' }) })
  description: Object;

  @ApiProperty({ example: 'https://www.example.com/icon.png' })
  icon: string;

  @ApiProperty({ example: JSON.stringify({ lang: 'Program highlights' }) })
  highlights: Object;

  @ApiProperty({
    example: JSON.stringify({ lang: 'Program criteria description' }),
  })
  criteriaDescription: Object;
}
