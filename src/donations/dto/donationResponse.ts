import { ApiProperty } from '@nestjs/swagger';

export class DonationResponse {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Kaffi' })
  accountName: string;

  @ApiProperty({ example: 'An IBAN' })
  iban: string;

  @ApiProperty({ example: '123456789' })
  swift: string;

  @ApiProperty({ example: 'Bank Audi' })
  bankName: string;

  @ApiProperty({ example: 'EUR' })
  currency: string;

  @ApiProperty({
    example: {
      paypal: 'url to kaffipaypal',
      gofundme: 'url to gofundme',
      benevity: 'string of the benevity modal',
    },
  })
  externalPayments: object;
}
