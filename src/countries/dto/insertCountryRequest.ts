import { ApiProperty } from '@nestjs/swagger';

export class InsertCountryRequest {
  @ApiProperty({ example: JSON.stringify({ en: 'Lebanon' }) })
  name: Object;
}
