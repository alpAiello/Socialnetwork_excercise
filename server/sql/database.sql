DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;

CREATE TABLE IF NOT EXISTS users
	(
id serial unique PRIMARY KEY ,
username varchar(256),
firstname varchar(256) NOT NULL,
lastname varchar(256) NOT NULL,
profile_picture_url varchar(256),
email varchar(256) UNIQUE NOT NULL,
hashed_password varchar(256) NOT NULL,
bio varchar(256),
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );

CREATE TABLE if not EXISTS reset_codes
    (
        id serial unique PRIMARY KEY ,
        email varchar(256) NOT NULL,
        reset_code varchar(256) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
     );
SELECT * FROM users;
SELECT * FROM reset_codes;