import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumberString } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class UpdateProgram {
  @ApiProperty({ type: Number, example: 20, required: true })
  @IsNumberString({ message: 'Please enter a valid id' })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Science' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program name should be multi-lingual' })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Caption ' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program caption should be multi-lingual' })
  caption: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program description' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program description should be multi-lingual' })
  description: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    name: 'iconFile',
  })
  iconFile?: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Program highlights' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Program highlights should be multi-lingual' })
  highlights: object;
}
