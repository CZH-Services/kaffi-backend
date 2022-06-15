ALTER TABLE Donation 
    ADD name varchar(255),
    ADD amount varchar(255);

ALTER TABLE Donation DROP COLUMN "accountName";
ALTER TABLE Donation DROP COLUMN iban;
ALTER TABLE Donation DROP COLUMN swift;
ALTER TABLE Donation DROP COLUMN "bankName";
ALTER TABLE Donation DROP COLUMN currency;
ALTER TABLE Donation DROP COLUMN "externalPayments";