DROP TABLE users;
DROP TABLE reset_codes;

CREATE TABLE IF NOT EXISTS users
	(
		id serial unique,
		username varchar(256) NOT NULL,
		firstname varchar(256) NOT NULL,
		lastname varchar(256) NOT NULL,
		email varchar(256) UNIQUE NOT NULL,
		hashed_password varchar(256) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP		
     );

CREATE TABLE if not EXISTS reset_codes
    (
        id serial unique,
        email varchar(256) UNIQUE NOT NULL,
        reset_code varchar(256) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
SELECT * FROM users;
SELECT * FROM reset_codes;