const spicedPg from "spiced-pg";
const dbURL = "postgres://alessandroaiello@localhost:5432/social-network";
const db = spicedPg(dbURL)

exports.addUser = (username, firstName, lastName, email, hashedPassword)=>{
	return db.query(`
		INSERT INTO 
			users
		VALUES
			$1,$2,$3,$4,$5
		RETURNING
			*;
		, [username,firstname,lastname,email,password]`)
}


id serial unique,
		 varchar(50),
		 varchar(50),
		 varchar(50),
		 varchar(50),
		 varchar(50)