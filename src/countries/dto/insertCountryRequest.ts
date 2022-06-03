import { ApiProperty } from '@nestjs/swagger';

export class InsertCountryRequest {
  @ApiProperty({ example: { en: 'Lebanon' } })
  name: Object;
}
