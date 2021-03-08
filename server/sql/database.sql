DROP TABLE users;

CREATE TABLE IF NOT EXISTS users
	(
		id serial unique,
		username varchar(256) NOT NULL,
		firstname varchar(256),
		lastname varchar(256),
		email varchar(256) UNIQUE NOT NULL,
		hashed_password varchar(256) NOT NULL
		);
SELECT * FROM users;