ALTER TABLE Donation DROP COLUMN name;
ALTER TABLE Donation 
    ADD COLUMN "accountName" varchar(255),
    ADD COLUMN iban varchar(255),
    ADD COLUMN swift varchar(255),
    ADD COLUMN "bankName" varchar(255),
    ADD COLUMN currency varchar(255),
    ADD COLUMN "externalPayments" JSON;