CREATE TABLE IF NOT EXISTS buddyMatch (
    id serial PRIMARY KEY,
    "buddyId" integer REFERENCES kaffiuser(id) ON DELETE CASCADE,
    "studentId" integer REFERENCES kaffiuser(id) ON DELETE CASCADE,
    "connectedBy" integer REFERENCES kaffiuser(id) ON DELETE CASCADE,
    "connectedOn" timestamp DEFAULT now()
)