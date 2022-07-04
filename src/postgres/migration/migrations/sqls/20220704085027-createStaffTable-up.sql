CREATE TABLE IF NOT EXISTS staff (
    id serial PRIMARY KEY,
    title JSON,
    tag VARCHAR(255),
    rank integer,
    user_id integer REFERENCES kaffiuser(id)
)