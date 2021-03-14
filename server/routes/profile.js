const express = require("express");
const router = express.Router();
const db = require("../sql/database.js");
const cookieSession = require("cookie-session");
const path = require("path");
const uidSafe = require("uid-safe");
const multer = require("multer");

const diskStorage = multer.diskStorage({
    destination: (request, file, callback) => {
        const destinationDirectory =
            __dirname + "../../../client/public/uploads/profile-pictures";
        callback(null, destinationDirectory);
    },
    filename: (request, file, callback) => {
        uidSafe(24).then((uuid) => {
            const originalExtension = path.extname(file.originalname);
            const filename = uuid + originalExtension;
            callback(null, filename);
        });
    },
});
const uploader = multer({
    limits: {
        fileSize: 5242880, // = 5MB in bytes
    },
    storage: diskStorage,
});

router.use(
    cookieSession({
        secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

router.post("/upload-picture", uploader.single("file"), (req, res) => {
    console.log(req.file);
    console.log(req.session.user.email);
    db.updatePictureURL(
        req.session.user.email,
        "/uploads/profile-pictures/" + req.file.filename
    )
        .then((result) => {
            delete result.rows[0].hashed_password;
            res.json(result.rows[0]);
        })
        .catch((err) => console.log(err));
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

router.get("/users/:id", (req, res) => {
    const userID = req.params.id;
    console.log(userID != req.session.user.id);
    console.log("req.session.user.id", req.session.user.id);
    console.log("userID", userID);
    if (userID != req.session.user.id) {
        db.getUserByID(userID)
            .then((result) => {
                if (result.rows.length === 0) {
                    res.json({ success: false });
                } else {
                    const userData = result.rows[0];
                    delete userData.hashed_password;
                    res.json(userData);
                }
            })
            .catch((err) => {
                res.json({ error: err });
            });
    } else {
        res.json({ isSignedInUser: true });
    }
});

router.post("/bio", async (req, res) => {
    console.log(req.session.user.email);
    console.log(req.body.bio);
    const result = await db.updateBio(req.session.user.email, req.body.bio);
    res.json(result);
});

module.exports = router;
