import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString } from 'class-validator';

export class UpdateProgram {
  @ApiProperty({ type: Number, example: 20, required: true })
  @IsNumberString({ message: 'Please enter a valid id' })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
    required: true,
  })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Caption ' }),
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
    example: 'https://www.example.com/icon.png',
    required: false,
    name: 'iconFile',
  })
  iconFile?: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program highlights' }),
    required: true,
  })
  highlights: object;
}
