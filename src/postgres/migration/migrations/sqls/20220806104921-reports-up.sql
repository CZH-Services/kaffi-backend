CREATE TABLE IF NOT EXISTS Reports (
    id serial primary key,
    "externalLink" TEXT,
    image TEXT,
    show boolean
);