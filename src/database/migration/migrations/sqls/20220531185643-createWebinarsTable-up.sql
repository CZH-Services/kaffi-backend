CREATE TABLE IF NOT EXISTS Webinars (
    id SERIAL PRIMARY KEY,
    rank INTEGER,
    "youtubeUrl" TEXT,
    "countryIconUrl" TEXT,
    "selectedCountryIconUrl" TEXT,
    "countryId" INTEGER,
    CONSTRAINT fk_country FOREIGN KEY("countryId") REFERENCES countries(id)
)