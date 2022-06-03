import { ApiProperty } from '@nestjs/swagger';

export class UpdateCountryRequest {
  @ApiProperty()
  id: number;

  @ApiProperty({ example: JSON.stringify({ en: 'Lebanon' }) })
  name: Object;
}
