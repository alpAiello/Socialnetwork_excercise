DROP TABLE users;

CREATE TABLE IF NOT EXISTS users
	(
		id serial unique,
		username varchar(256),
		firstname varchar(256),
		lastname varchar(256),
		email varchar(256),
		hashed_password varchar(256)
		);
SELECT * FROM users;