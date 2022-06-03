CREATE TABLE IF NOT EXISTS WebinarSteps (
    id SERIAL PRIMARY KEY,
    rank INTEGER,
    title JSON,
    paragraph JSON,
    "webinarId" INTEGER,
    CONSTRAINT fk_webinar FOREIGN KEY("webinarId") REFERENCES webinars(id)
)