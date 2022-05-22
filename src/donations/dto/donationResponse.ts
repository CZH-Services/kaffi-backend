import { ApiProperty } from '@nestjs/swagger';

export class DonationResponse {
  @ApiProperty({ example: 'Charbel Soufia' })
  name: string;

  @ApiProperty({ example: 20, description: 'The amount donated' })
  amount: number;

  @ApiProperty()
  id: number;
}
