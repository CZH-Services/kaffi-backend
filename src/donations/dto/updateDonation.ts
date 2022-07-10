import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsString, ValidateNested } from 'class-validator';
import { IsMultiLingual } from 'src/validations/MultiLanguageValidations';

class ExternalPayments {
  @ApiProperty({ example: 'url to kaffipaypal' })
  @IsString({ message: 'paypal must be a url string' })
  paypal: string;

  @ApiProperty({ example: 'https://www.gofundme.com/f/kaffi' })
  @IsString({ message: 'gofundme must be a url string' })
  gofundme: string;

  @ApiProperty({
    example: {
      en: `We are now on Benevity, a donation platform that several companies
  are partnered with, like Google & Microsoft. These companies
  typically match employee donations, thus doubling your contribution
  to us. If your company is partnered with Benevity, consider us for
  your donation.`,
      de: `Wir sind jetzt auf Benevity, einer Spendenplattform, die mehrere Unternehmen nutzen
  Partner sind, wie Google & Microsoft. Diese Unternehmen
  in der Regel mit Mitarbeiterspenden verdoppeln und so Ihren Beitrag verdoppeln
  zu uns. Wenn Ihr Unternehmen Partner von Benevity ist, ziehen Sie uns in Betracht
  Ihre Spende.`,
    },
  })
  @IsMultiLingual({ message: 'benevity should be multi-lingual' })
  benevity: Object;
}

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

  @ApiProperty({ type: ExternalPayments })
  @ValidateNested()
  @Type(() => ExternalPayments)
  externalPayments: ExternalPayments;
}
