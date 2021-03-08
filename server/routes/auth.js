const express = require("express");
const router = express.Router();
const db = require("../sql/database.js");
const bcrypt = require("../bcrypt");
const cookieSession = require("cookie-session");
router.use(
    cookieSession({
        secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6
    })
);

router.post("/register", (req, res) => {
    console.log(req.body);
    const { username, firstname, lastname, email, password } = req.body;
    console.log(username, firstname, lastname, email, password);
    bcrypt
        .genHash(password)
        .then((hashed_password) => {
            console.log(hashed_password);
            db.addUser(username, firstname, lastname, email, hashed_password)
                .then((dbReturnData) => {
                    const userData = dbReturnData.rows[0];
                    console.log(dbReturnData.rows[0]);
                    const {
                        id,
                        username,
                        firstname,
                        lastname,
                        email,
                        hashed_password
                    } = userData;
                    console.log(
                        "The user was added successfully",
                        "data:",
                        id,
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
                    req.session.user = {
                        id: id,
                        username: username,
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        hashed_password: hashed_password
                    };
                    res.json({
                        registrationMessage: "registration successfully"
                    });
                })
                .catch((err) => {
                    console.log(
                        "must make a real error message here !!!!",
                        err
                    );
                    res.json({
                        registrationMessage: "registration failed"
                    });
                });
        })
        .catch((err) => {
            console.log("must make a real error message here !!!!", err);
            res.json({ registrationMessage: "Password encryption failed" });
        });
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        db.getUserByEmail(email).then((user) => {
            const currentUser = user.rows;
            if (currentUser.length !== 0) {
                const hashed_password = currentUser[0].hashed_password;
                bcrypt.compare(password, hashed_password).then((result) => {
                    if (result) {
                        req.session.user = currentUser[0];
                        res.json({
                            success: true,
                            loginMessage: "login successfully"
                        });
                    } else {
                        return res.json({
                            success: false,
                            loginMessage: "Please try again! Email or password are incorrect."
                        });
                    }
                });
            } else {
                return res.json({
                    success: false,
                    loginMessage: "Please try again! Email or password are incorrect."
                });
            }
        });
    } else {
        return res.json({
            success: false,
            loginMessage: "Please fill out both fields"
        });
    }
});

module.exports = router;
