const express = require("express");
const router = express.Router();
const db = require("../sql/database.js");
const cookieSession = require("cookie-session");

router.use(
    cookieSession({
        secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

router.post("/upload-picture", (req, res) => {
    res.json(req.body);
});

router.get("/user", (req, res) => {
    const { email } = req.session.user;
    db.getUserByEmail(email).then((result) => {
        if (result.rows.length === 0) {
            res.json({ success: false });
        } else {
            const userData = result.rows[0];
            delete userData.hashed_password;
            res.json(userData);
        }
    });
});

module.exports = router;
