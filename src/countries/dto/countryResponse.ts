import { ApiProperty } from '@nestjs/swagger';

export class CountryResponse {
  @ApiProperty({ example: JSON.stringify({ en: 'Lebanon' }) })
  name: JSON;

  @ApiProperty()
  id: number;
}
