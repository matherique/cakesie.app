CREATE TABLE IF NOT EXISTS product(
  Id serial not null primary key,
  Name varchar(100) not null,
  Unity varchar(2) not null
);