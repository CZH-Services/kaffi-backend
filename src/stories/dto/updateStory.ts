import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsString, IsBoolean } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class UpdateStory {
  @ApiProperty({ type: Number, example: 20, required: true })
  @IsNumberString({ message: 'Please enter a valid id' })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Elie Khoury' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Member name should be multi-lingual' })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Member quote goes here ' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Member quote should be multi-lingual' })
  quote: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Engineer' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Member major should be multi-lingual' })
  major: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    name: 'iconFile',
  })
  iconFile?: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: '2022 Cycle' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Cycle should be multi-lingual' })
  cycle: object;

  @ApiProperty({
    type: String,
    example: 'ae',
    required: true,
  })
  @IsString({ message: 'Country Code must be a string' })
  country_code: string;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsString({ message: 'Primary must be either true or false' })
  primary: string;
}
