import { ApiProperty } from '@nestjs/swagger';

export class DonationResponse {
  @ApiProperty({ example: '27,000€ +' })
  amount: string;

  @ApiProperty({ example: 'Kaffi e.V.' })
  accountName: string;

  @ApiProperty({ example: 'DE51430609671262435500' })
  iban: string;

  @ApiProperty({ example: 'GENODEM1GLS' })
  swift: string;

  @ApiProperty({ example: 'GLS Bank' })
  bankName: string;

  @ApiProperty({ example: 'EUR' })
  currency: string;

  @ApiProperty({
    example: {
      paypal: 'url to kaffipaypal',
      gofundme: 'https://www.gofundme.com/f/kaffi',
      benevity: `We are now on Benevity, a donation platform that several companies
      are partnered with, like Google & Microsoft. These companies
      typically match employee donations, thus doubling your contribution
      to us. If your company is partnered with Benevity, consider us for
      your donation.`,
    },
  })
  externalPayments: object;
}
