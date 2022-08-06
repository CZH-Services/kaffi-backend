import { DonationRepository } from 'src/donations/donations.repository';

export const initiateDonations = async (postgresService) => {
  const donationInitialRecord = {
    id: 1,
    accountName: 'Kaffi e.V.',
    iban: 'DE51430609671262435500',
    swift: 'SWIFT must be a string',
    bankName: 'Bank name must be a string',
    currency: 'Currency must be a string',
    externalPayments: {
      benevity: {
        de: 'Wir sind jetzt auf Benevity, einer Spendenplattform, die mehrere Unternehmen nutzen\n  Partner sind, wie Google & Microsoft. Diese Unternehmen\n  in der Regel mit Mitarbeiterspenden verdoppeln und so Ihren Beitrag verdoppeln\n  zu uns. Wenn Ihr Unternehmen Partner von Benevity ist, ziehen Sie uns in Betracht\n  Ihre Spende.',
        en: 'We are now on Benevity, a donation platform that several companies\n  are partnered with, like Google & Microsoft. These companies\n  typically match employee donations, thus doubling your contribution\n  to us. If your company is partnered with Benevity, consider us for\n  your donation.',
      },
      gofundme: 'https://www.gofundme.com/f/kaffi',
    },
    amount: '27,000€ +',
  };
  const donationRepository = new DonationRepository(postgresService);
  await donationRepository.seedDonation(donationInitialRecord);
};
