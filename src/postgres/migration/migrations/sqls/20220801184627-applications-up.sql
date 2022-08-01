CREATE TABLE IF NOT EXISTS Applications (
    id serial PRIMARY KEY,
    "userId" integer REFERENCES kaffiuser(id) ON DELETE CASCADE,
    "programId" integer REFERENCES Program(id) ON DELETE CASCADE,
    "cycleId" integer REFERENCES ProgramCycle(id) ON DELETE CASCADE,
    "applicationStatus" varchar(255),
    "scholarshipStatus" varchar(255)
);