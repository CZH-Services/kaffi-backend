class ExternalPayments {
  gofundme: string;
  benevity: Object;
}
export class Donation {
  id: number;
  amount: string;
  accountName: string;
  iban: string;
  swift: string;
  bankName: string;
  currency: string;
  externalPayments: ExternalPayments;
}
