DROP TABLE IF EXISTS Permission;
DROP TABLE IF EXISTS KaffiRole;
DROP TABLE IF EXISTS Committee;

CREATE TABLE Permission (
    id serial PRIMARY KEY,
    "userId" integer,
    role text,
    committee text,
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES KaffiUser(id) ON DELETE CASCADE
);