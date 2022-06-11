import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddWebinarRequest {
  @ApiProperty({ example: 'https://www.youtube.com/embed/t3hKhiSLQEA' })
  @IsNotEmpty({ message: 'Webinar youtubeUrl is required' })
  youtubeUrl: string;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'countryIconUrl',
  })
  countryIconUrl: object;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
    name: 'selectedCountryIconUrl',
  })
  selectedCountryIconUrl: object;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Webinar countryId is required ' })
  countryId: number;
}
