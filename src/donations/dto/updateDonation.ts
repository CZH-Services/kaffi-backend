import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateDonation {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Id must be a number' })
  id: number;

  @ApiProperty({ example: '27,000€ +' })
  amount: string;

  @ApiProperty({ example: 'Kaffi e.V.' })
  @IsString({ message: 'Account name must be a string' })
  accountName: string;

  @ApiProperty({ example: 'DE51430609671262435500' })
  @IsString({ message: 'IBAN must be a string' })
  iban: string;

  @ApiProperty({ example: 'GENODEM1GLS' })
  @IsString({ message: 'SWIFT must be a string' })
  swift: string;

  @ApiProperty({ example: 'GLS Bank' })
  @IsString({ message: 'Bank name must be a string' })
  bankName: string;

  @ApiProperty({ example: 'EUR' })
  @IsString({ message: 'Currency must be a string' })
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
