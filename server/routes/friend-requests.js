const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
// const db = require("./sql/database.js");
const cookieSession = require("cookie-session");
const db = require("../sql/database.js");
const router = express.Router();

router.use(
    cookieSession({
        secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

router.use(
    express.urlencoded({
        extended: false,
    })
);

router.use(compression());
router.use(express.json());

router.get("/hello", (req, res) => {
    res.json(req.session.user.id);
});

module.exports = router;
