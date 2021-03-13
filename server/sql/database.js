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

exports.updatePassword = (email, hashed_newPassword) => {
    return db.query(
        `
    UPDATE 
        users
    SET
        hashed_password = $2
    WHERE
        email = $1
        `,
        [email, hashed_newPassword]
    );
};

exports.addResetCode = (email, reset_code) => {
    return db.query(
        `
		INSERT INTO 
			reset_codes (email, reset_code)
		VALUES
			($1,$2)
		RETURNING
			*;
		`,
        [email, reset_code]
    );
};

exports.getUserByEmail = (email) => {
    return db.query(`SELECT * FROM users WHERE email = $1`, [email]);
};

exports.getResetCodeByEmail = (email) => {
    return db.query(
        `
	SELECT 
	       reset_code 
	FROM 
	     reset_codes 
	WHERE 
	      email=$1
	AND 
	      CURRENT_TIMESTAMP - created_at < INTERVAL '10 minutes'
    ORDER BY
        created_at DESC;
	`,
        [email]
    );
};

exports.getUserByUsername = (username) => {
    return db.query(`SELECT * FROM users WHERE username = $1`, [username]);
};
