import { ApiProperty } from '@nestjs/swagger';

export class GetCountryRequest {
  @ApiProperty()
  id: number;
}
