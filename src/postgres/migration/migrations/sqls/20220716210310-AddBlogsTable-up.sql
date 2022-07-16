CREATE TABLE IF NOT EXISTS Blogs (
    id serial PRIMARY KEY,
    title JSON,
    summary JSON,
    image TEXT,
    date DATE,
    "externalLink" TEXT,
    "HTMLString" JSON
)