DROP TABLE UserRole;
CREATE TABLE UserRole (
    id serial PRIMARY KEY,
    userId integer,
    roleId integer,
    committee integer,
    CONSTRAINT fk_user FOREIGN KEY(userId) REFERENCES KaffiUser(id)
);