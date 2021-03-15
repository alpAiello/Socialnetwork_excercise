DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reset_codes;
DROP TABLE IF EXISTS friend_requests;
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

CREATE TABLE if not EXISTS friend_requests
(
    id serial unique PRIMARY KEY ,
    from_id varchar(256),
    to_id varchar(256),
    accepted boolean,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
SELECT * FROM reset_codes;
SELECT * FROM friend_requests;

INSERT INTO friend_requests (from_id, to_id, accepted)
VALUES (201,2,true), (3,201,true), (201,4,false), (5,201,false);