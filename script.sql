CREATE TABLE marca(
	id serial not null primary key,
	descricao varchar(200) not null unique
);

CREATE TABLE produto(
	id serial not null primary key,
	id_marca integer not null,
	descricao varchar(200) not null,
	preco numeric(5,2) not null,
	
	CONSTRAINT fk_marca FOREIGN KEY (id_marca) REFERENCES marca(id)
);