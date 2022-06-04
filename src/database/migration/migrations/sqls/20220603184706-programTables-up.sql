CREATE TABLE IF NOT EXISTS Program (
    id serial PRIMARY KEY,
    name JSON,
    description JSON,
    icon varchar(255),
    highlights JSON,
    criteriaDescription JSON
);

CREATE TABLE IF NOT EXISTS ProgramCycle (
    id serial PRIMARY KEY,
    programId integer,
    active boolean,
    submition timestamp,
    deadline timestamp,
    results timestamp,
    CONSTRAINT fk_program FOREIGN KEY(programId) REFERENCES Program(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProgramDescription (
    id serial PRIMARY KEY,
    programId integer,
    rank integer,
    description JSON,
    CONSTRAINT fk_program FOREIGN KEY(programId) REFERENCES Program(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ProgramCriterion (
    id serial PRIMARY KEY,
    programId integer,
    rank integer,
    description JSON,
    CONSTRAINT fk_program FOREIGN KEY(programId) REFERENCES Program(id) ON DELETE CASCADE
);