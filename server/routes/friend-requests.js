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

const STATUS_FRIENDS_REQUEST_NO_REQUEST = "no request";
const STATUS_FRIENDS_REQUEST_REQUEST_ACCEPTED = "request accepted";
const STATUS_FRIENDS_REQUEST_REQUEST_BY_ME = "request by me";
const STATUS_FRIENDS_REQUEST_REQUEST_TO_ME = "request to me";

router.get("/:other-id", async (req, res) => {
    const userID = req.session.user.id;
    const otherID = req.params["other-id"];
    const result = db.getFriendsRequest(userID, otherID);
    console.log(result);
});

module.exports = router;
