import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class UpdateProgram {
  @ApiProperty({ type: Number, example: 20, required: true })
  @IsInt({ message: 'Please enter a valid id' })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
    required: true,
  })
  name: Object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
    required: true,
  })
  description: Object;

  @ApiProperty({
    type: String,
    example: 'https://www.example.com/icon.png',
    required: true,
  })
  icon: string;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program highlights' }),
    required: true,
  })
  highlights: Object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({
      lang: 'Program criteria description',
      required: true,
    }),
  })
  criteriaDescription: Object;
}
