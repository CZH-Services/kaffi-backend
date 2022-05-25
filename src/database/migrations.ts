export const migrations = [
  {
    date: '2022-05-25 19:21:14+0000',
    query:
      'CREATE TABLE IF NOT EXISTS Donation (id serial, name varchar(50), amount integer)',
  },
];
