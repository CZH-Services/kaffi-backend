import { ApiProperty } from '@nestjs/swagger';

export class deleteCountryRequest {
  @ApiProperty()
  id: number;
}
