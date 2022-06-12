import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class GetWebinarResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 1 })
  rank: number;

  @ApiProperty()
  youtubeUrl: string;

  @ApiProperty()
  countryIconUrl: string;

  @ApiProperty()
  selectedCountryIconUrl: string;

  @ApiProperty({ example: 1 })
  countryId: number;

  @ApiProperty({ example: { en: 'Lebanon' } })
  country: object;
}
