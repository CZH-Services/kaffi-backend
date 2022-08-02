import { ApiProperty } from '@nestjs/swagger';

export class StoryResponse {
  @ApiProperty({ type: Number, example: 1 })
  id: number;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Elie Khoury' }),
  })
  name: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Member quote goes here' }),
  })
  quote: object;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: 'Computer Engineer' }),
  })
  major: object;

  @ApiProperty({ type: String, example: 'https://www.example.com/icon.png' })
  icon?: string;

  @ApiProperty({
    type: Object,
    example: JSON.stringify({ lang: '2022 cycle' }),
  })
  cycle: object;

  @ApiProperty({ type: String, example: 'de' })
  country_code: string;

  @ApiProperty({ type: String, example: true })
  primary: string;
}
