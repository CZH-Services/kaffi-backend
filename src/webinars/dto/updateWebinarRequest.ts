import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateWebinarRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'youtubeUrl is required' })
  youtubeUrl: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    name: 'countryIconUrl',
  })
  countryIconUrl?: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: false,
    name: 'selectedCountryIconUrl',
  })
  selectedCountryIconUrl?: object;

  @ApiProperty()
  @IsNotEmpty({ message: 'rank is required' })
  rank: number;
}
