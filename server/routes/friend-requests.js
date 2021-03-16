const express = require("express");
// const db = require("./sql/database.js");
const db = require("../sql/database.js");
const router = express.Router();

const STATUS_FRIENDS_REQUEST_NO_REQUEST = "no request";
const STATUS_FRIENDS_REQUEST_REQUEST_ACCEPTED = "request accepted";
const STATUS_FRIENDS_REQUEST_REQUEST_BY_ME = "request by me";
const STATUS_FRIENDS_REQUEST_REQUEST_TO_ME = "request to me";

router.get("/:otherID", async (req, res) => {
    const userID = String(req.session.user.id);
    const otherID = req.params.otherID;
    console.log("userID,otherID------------------->", userID, otherID);
    console.log(
        "userID,otherID-------------------> typeof",
        typeof userID,
        typeof otherID
    );
    const result = await db.getFriendsRequest(userID, otherID);
    console.log("result", result.rows);
    if (result.rows.length === 0) {
        res.json({ status: STATUS_FRIENDS_REQUEST_NO_REQUEST });
    } else {
        const { from_id, to_id, accepted } = result.rows[0];
        console.log("from_id, to_id, accepted", from_id, to_id, accepted);
        console.log(
            "typeof from_id, to_id, accepted",
            typeof from_id,
            typeof to_id,
            accepted
        );
        if (accepted === true) {
            res.json({ status: STATUS_FRIENDS_REQUEST_REQUEST_ACCEPTED });
        } else {
            if (userID === from_id) {
                res.json({ status: STATUS_FRIENDS_REQUEST_REQUEST_BY_ME });
            } else if (userID === to_id) {
                res.json({ status: STATUS_FRIENDS_REQUEST_REQUEST_TO_ME });
            }
        }
    }
});

router.post("/make/:otherID", (req, res) => {
    const otherID = req.params.otherID
    const userID = String(req.session.user.id)
    console.log("otherID----------->", otherID)
    console.log("userID----------->", userID)
    const result = await db.makeRequest(userID, otherID)
    const newStatus = result.rows[0]
    res.json(result)
});
router.post("/cancel/:otherID", (req, res) => {
    const otherID = req.params.otherID
    const userID = String(req.session.user.id)
    console.log("otherID----------->", otherID)
    console.log("userID----------->", userID)
    const result = await db.cancelRequest(userID, otherID)
    const newStatus = result.rows[0]
    res.json(result)
});
router.post("/accept/:otherID", (req, res) => {
    const otherID = req.params.otherID
    const userID = String(req.session.user.id)
    console.log("otherID----------->", otherID)
    console.log("userID----------->", userID)
    const result = await db.acceptRequest(userID, otherID)
    const newStatus = result.rows[0]
    res.json(result)
});
router.post("/unfriend/:otherID", (req, res) => {
    const otherID = req.params.otherID
    const userID = String(req.session.user.id)
    console.log("otherID----------->", otherID)
    console.log("userID----------->", userID)
    const result = await db.unfriend(userID, otherID)
    const newStatus = result.rows[0]
    res.json(result)
});

module.exports = router;
