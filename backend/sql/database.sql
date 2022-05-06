CREATE TABLE IF NOT EXISTS product(
  Id serial not null primary key,
  Name varchar(100) not null,
  Quantity int not null
);