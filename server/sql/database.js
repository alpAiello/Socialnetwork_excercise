const spicedPg = require("spiced-pg");
const dbURL = "postgres://alessandroaiello@localhost:5432/social-network";
const db = spicedPg(dbURL);

exports.addUser = (username, firstname, lastname, email, hashed_password) => {
	return db.query(
		`
		INSERT INTO 
			users (username, firstname, lastname, email, hashed_password)
		VALUES
			($1,$2,$3,$4,$5)
		RETURNING
			*;
		`,
		[username, firstname, lastname, email, hashed_password]
	);
};

exports.getUserByEmail = (email) => {
	return db.query(
		`SELECT * FROM users WHERE email = $1`,
		[email]
	);
};

exports.getUserByUsername = (username) => {
	return db.query(
		`SELECT * FROM users WHERE username = $1`,
		[username]
	);
};
