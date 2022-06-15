import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString } from 'class-validator';

export class UpdateDonation {
  @ApiProperty({ example: 1 })
  @IsInt({ message: 'Id must be a number' })
  id: number;

  @ApiProperty({ example: 'Kaffi' })
  @IsString({ message: 'Account name must be a string' })
  accountName: string;

  @ApiProperty({ example: 'An IBAN' })
  @IsString({ message: 'IBAN must be a string' })
  iban: string;

  @ApiProperty({ example: '123456789' })
  @IsString({ message: 'SWIFT must be a string' })
  swift: string;

  @ApiProperty({ example: 'Bank Audi' })
  @IsString({ message: 'Bank name must be a string' })
  bankName: string;

  @ApiProperty({ example: 'EUR' })
  @IsString({ message: 'Currency must be a string' })
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
