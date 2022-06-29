DROP TABLE UserRole;
CREATE TABLE UserRole (
    id serial PRIMARY KEY,
    "userId" integer,
    "roleId" integer,
    "committeeId" integer,
    CONSTRAINT fk_user FOREIGN KEY("userId") REFERENCES KaffiUser(id) ON DELETE CASCADE,
    CONSTRAINT fk_role FOREIGN KEY("roleId") REFERENCES KaffiRole(id) ON DELETE CASCADE,
    CONSTRAINT fk_committee FOREIGN KEY("committeeId") REFERENCES Committee(id) ON DELETE CASCADE
);