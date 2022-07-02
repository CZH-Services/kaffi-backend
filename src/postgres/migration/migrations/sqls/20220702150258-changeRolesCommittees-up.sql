DROP TABLE Permission;
DROP TABLE KaffiRole;
DROP TABLE Committee;

CREATE TABLE Permission (
    id serial PRIMARY KEY,
    "userId" integer,
    role text,
    committee text,
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES KaffiUser(id) ON DELETE CASCADE
);