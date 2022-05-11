CREATE TABLE IF NOT EXISTS product(
  Id serial not null primary key,
  Name varchar(100) not null,
  Unity varchar(2) not null
);

CREATE TABLE IF NOT EXISTS cake(
  Id serial not null primary key,
  Name varchar(100) not null,
  Price decimal(10,2) not null,
  Status boolean not null,
  Description text not null,
);

CREATE TABLE IF NOT EXISTS ingredients(
  Id serial not null primary key,
  ProductId int not null references product(Id),
  CakeId int not null references cake(Id),
  Quantity int not null,
);

CREATE TABLE IF NOT EXISTS stock(
  Id serial not null primary key,
  ProductId int not null references product(Id),
  Quantity int not null,
  AddedAt timestamp not null default now(),
)