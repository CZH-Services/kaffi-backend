import { ApiProperty } from '@nestjs/swagger';

export class GetCountryResponse {
  @ApiProperty({ example: JSON.stringify({ en: 'Lebanon' }) })
  name: Object;

  @ApiProperty()
  id: number;
}
