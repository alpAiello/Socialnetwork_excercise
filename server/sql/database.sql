CREATE TABLE IF NOT EXISTS users
	(
		id serial unique,
		username varchar(50),
		firstname varchar(50),
		lastname varchar(50),
		email varchar(50),
		password varchar(50)
		);