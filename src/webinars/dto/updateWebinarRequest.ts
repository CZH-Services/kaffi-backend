import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class UpdateWebinarRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  id: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'youtubeUrl is required' })
  youtubeUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'countryIconUrl is required' })
  countryIconUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'selectedCountryIconUrl is required' })
  selectedCountryIconUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'rank is required' })
  rank: number;
}
