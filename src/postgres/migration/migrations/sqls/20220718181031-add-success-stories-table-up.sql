CREATE TABLE IF NOT EXISTS Success_stories (
    id serial PRIMARY KEY,
    quote JSON,
    name JSON,
    major JSON,
    cycle JSON,
    country_code varchar(4),
    image TEXT,
    "primary_story" boolean
)