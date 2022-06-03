import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class AddWebinarRequest {
  @ApiProperty({ example: 'https://www.youtube.com/embed/t3hKhiSLQEA' })
  @IsNotEmpty({ message: 'Webinar youtubeUrl is required' })
  youtubeUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Webinar countryIconUrl is required' })
  countryIconUrl: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Webinar selectedCountryIconUrl is required' })
  selectedCountryIconUrl: string;

  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'Webinar countryId is required ' })
  countryId: number;
}
