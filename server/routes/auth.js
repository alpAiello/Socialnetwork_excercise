const express = require("express");
const router = express.Router();
const db = require("../sql/database.js");
const bcrypt = require("../bcrypt");
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");
const ses = require("../aws/ses");

router.use(
    cookieSession({
        secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

router.post("/create-reset-code", (req, res) => {
    console.log(req.body.email);
    db.getUserByEmail(req.body.email).then((result) => {
        if (result.rows.length === 0) {
            res.json({ success: false });
        } else {
            const userData = result.rows[0];
            delete userData.hashed_password;
            console.log(userData);
            const reset_code = cryptoRandomString({ length: 10 });
            db.addResetCode(userData.email, reset_code).then((result) => {
                console.log(result.rows[0]);
                ses.sendEmail(userData.email, reset_code)
                    .promise()
                    .then(() => res.json({ success: true }))
                    .catch(() => res.json({ success: false }));
            });
        }
    });
});

router.post("/reset-password", (req, res) => {
    const { email, newPassword, reset_code } = req.body;
    console.log("email", email);
    console.log("newPassword", newPassword);
    console.log("reset_code", reset_code);
    db.getUserByEmail(email)
        .then((user) => {
            console.log("user", user);
            db.getResetCodeByEmail(user.rows[0].email)
                .then((reset_codeFromDB) => {
                    console.log("reset_codeFromDB", reset_codeFromDB.rows);
                    if (reset_codeFromDB.rows[0].reset_code === reset_code) {
                        bcrypt
                            .genHash(newPassword)
                            .then((hashed_newPassword) => {
                                console.log(
                                    "hashed_newPassword",
                                    hashed_newPassword
                                );
                                db.updatePassword(email, hashed_newPassword)
                                    .then((result) => {
                                        console.log(result);
                                        res.json({ success: true });
                                    })
                                    .catch((err) => {
                                        console.log("err", err);
                                        res.json({ errorMessage: err });
                                    });
                            });
                    } else {
                        res.json({
                            success: false,
                            errorMessage: "reset codes dont match",
                        });
                    }
                })
                .catch((err) =>
                    res.json({ success: false, errorMessage: err })
                );
        })
        .catch((err) => res.json({ success: false, errorMessage: err }));
});

router.post("/register", (req, res) => {
    console.log(req.body);
    const { username, firstname, lastname, email, password } = req.body;
    if (username && firstname && lastname && email && password) {
        console.log(username, firstname, lastname, email, password);
        bcrypt
            .genHash(password)
            .then((hashed_password) => {
                console.log(hashed_password);
                db.addUser(
                    username,
                    firstname,
                    lastname,
                    email,
                    hashed_password
                )
                    .then((dbReturnData) => {
                        const userData = dbReturnData.rows[0];
                        console.log(dbReturnData.rows[0]);
                        const {
                            id,
                            username,
                            firstname,
                            lastname,
                            email,
                            hashed_password,
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
                            hashed_password: hashed_password,
                        };
                        res.json({
                            success: true,
                            registrationMessage: "registration successfully",
                        });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.json({
                            success: false,
                            registrationMessage: "registration failed",
                        });
                    });
            })
            .catch((err) => {
                console.log(err);
                res.json({
                    success: false,
                    registrationMessage: "Password encryption failed",
                });
            });
    } else {
        res.json({
            success: false,
            registrationMessage: "Please fill out the field",
        });
    }
});

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
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
                            loginMessage: "login successful",
                        });
                    } else {
                        return res.json({
                            success: false,
                            loginMessage: "Email or password are incorrect.",
                        });
                    }
                });
            } else {
                return res.json({
                    success: false,
                    loginMessage: "Email or password are incorrect.",
                });
            }
        });
    } else {
        return res.json({
            success: false,
            loginMessage: "Please fill out the field",
        });
    }
});

module.exports = router;
