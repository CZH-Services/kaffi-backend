import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
export class GetCountryWebinarRequest {
  @ApiProperty({ example: 1 })
  @IsNotEmpty({ message: 'id is required' })
  countryId: number;
}
