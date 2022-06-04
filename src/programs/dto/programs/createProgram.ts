import { ApiProperty } from '@nestjs/swagger';

export class CreateProgram {
  @ApiProperty({
    example: JSON.stringify({ lang: 'Computer Science' }),
    required: true,
  })
  name: Object;

  @ApiProperty({
    example: JSON.stringify({ lang: 'Program description' }),
    required: true,
  })
  description: Object;

  @ApiProperty({ example: 'https://www.example.com/icon.png', required: true })
  icon: string;

  @ApiProperty({
    example: JSON.stringify({ lang: 'Program highlights' }),
    required: true,
  })
  highlights: Object;

  @ApiProperty({
    example: JSON.stringify({ lang: 'Program criteria description' }),
    required: true,
  })
  criteriaDescription: Object;
}
