import { ApiProperty } from '@nestjs/swagger';

export class CreateProgram {
  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
    required: true,
  })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Caption' }),
    required: true,
  })
  caption: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
    required: true,
  })
  description: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'iconFile',
  })
  iconFile: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program highlights' }),
    required: true,
  })
  highlights: object;
}
