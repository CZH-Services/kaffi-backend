import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

export class CreateStory {
  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Elie Khoury' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Member name should be multi-lingual' })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'A Quote from the member' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Member quote should be multi-lingual' })
  quote: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Engineer' }),
    required: true,
  })
  @IsMultiLingual({ message: 'Major should be multi-lingual' })
  major: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'iconFile',
  })
  iconFile: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: '2022 cycle' }),
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
