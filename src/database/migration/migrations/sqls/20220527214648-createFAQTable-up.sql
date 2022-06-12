CREATE TABLE IF NOT EXISTS FAQ (
    id serial PRIMARY KEY,
    question JSON,
    answer JSON,
    rank integer,
    category_id integer REFERENCES FAQCategory (id)

)