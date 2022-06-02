CREATE TABLE IF NOT EXISTS KaffiUser (
    id serial PRIMARY KEY,
    firstName varchar(255),
    lastName varchar(255),
    email varchar(255),
    password varchar(255)
);

CREATE TABLE IF NOT EXISTS KaffiRole (
    id serial PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE IF NOT EXISTS Committee (
    id serial PRIMARY KEY,
    name varchar(255)
);

CREATE TABLE IF NOT EXISTS UserRole (
    id serial PRIMARY KEY,
    userId integer,
    roleId integer,
    committee integer,
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES KaffiUser(id)
);