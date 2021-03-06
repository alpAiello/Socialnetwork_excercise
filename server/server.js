const express = require("express");
const compression = require("compression");
const path = require("path");
const bcrypt = require("./bcrypt");
const app = express();
const db = require("./sql/database.js");
const cookieSession = require("cookie-session");

app.use(
	cookieSession({
		secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
		maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
	})
);

app.use(
	express.urlencoded({
		extended: false,
	})
);

app.use(compression());
app.use(express.json());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.post("/api/users/register", (req, res) => {
	console.log(req.body);
	const { username, firstName, lastName, email, password } = req.body;
	console.log(username, firstName, lastName, email, password);
	bcrypt
		.genHash(password)
		.then((hashed_password) => {
			console.log(hashed_password);
			db.addUser(username, firstName, lastName, email, hashed_password)
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

app.get("*", function (req, res) {
	res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.listen(process.env.PORT || 3001, function () {
	console.log("I'm listening.");
});

module.exports.getApp = app;
