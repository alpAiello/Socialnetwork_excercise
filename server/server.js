const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
// const db = require("./sql/database.js");
const cookieSession = require("cookie-session");
const auth = require("./routes/auth.js");

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

app.use("/api/auth", auth);

app.get("*", function (req, res) {
	// if (!req.session.user) {
	// 	res.redirect(302, "/welcome");
	// } else {
	// 	res.redirect(302, "/");
	res.sendFile(path.join(__dirname, "..", "client", "index.html"));
	// }
});

app.listen(process.env.PORT || 3001, function () {
	console.log("I'm listening.");
});

module.exports.getApp = app;
