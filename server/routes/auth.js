const express = require("express");
const router = express.Router();
const db = require("../sql/database.js");
const bcrypt = require("../bcrypt");

router.post("/register", (req, res) => {
	console.log(req.body);
	const { username, firstname, lastname, email, password } = req.body;
	console.log(username, firstname, lastname, email, password);
	bcrypt
		.genHash(password)
		.then((hashed_password) => {
			console.log(hashed_password);
			db.register(username, firstname, lastname, email, hashed_password)
				.then((dbReturnData) => {
					const userData = dbReturnData.rows[0];
					console.log(dbReturnData.rows[0]);
					const {
						username,
						firstname,
						lastname,
						email,
						hashed_password,
					} = userData;
					console.log(
						"The user was added successfully",
						"data:",
						username,
						"data:",
						firstname,
						"data:",
						lastname,
						"data:",
						email,
						"data:",
						hashed_password
					);
					req.session.user = userData;
					res.json({
						registrationMessage: "registration successfully",
					});
				})
				.catch((err) => {
					console.log(
						"must make a real error message here !!!!",
						err
					);
					res.json({
						registrationMessage: "registration failed",
					});
				});
		})
		.catch((err) => {
			console.log("must make a real error message here !!!!", err);
			res.json({ registrationMessage: "Password encryption failed" });
		});
});

module.exports = router;
