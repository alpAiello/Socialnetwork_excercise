const express = require("express");
const compression = require("compression");
const path = require("path");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});

const auth = require("./routes/auth.js");
const profile = require("./routes/profile.js");
const friendRequests = require("./routes/friend-requests");
const db = require("./sql/database.js");
const csurf = require("csurf");
// const db = require("./sql/database.js");
const cookieSession = require("cookie-session");

const cookieSessionMiddleware = cookieSession({
    secret: `Keine Verbesserung ist zu klein oder geringfügig, als dass man sie nicht durchführen sollte.`,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
});

app.use(cookieSessionMiddleware);
io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(
    express.urlencoded({
        extended: false,
    })
);

app.use(compression());
app.use(express.json());

app.use(csurf());
app.use((req, res, next) => {
    res.cookie("token", req.csrfToken());
    next();
});

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.use("user--------------> ", (req, res, next) => {
    console.log(req.session.user);
    next();
});

io.on("connection", (socket) => {
    console.log(`socket with the id ${socket.id} is now connected`);
});

app.use("/api/auth", auth);
app.use("/api/profile", profile);
app.use("/api/friend-requests", friendRequests);

app.get("/api/search/", (req, res) => {
    console.log("hello");
    const query = req.query.search;
    console.log("query", query);
    db.getUserListByName(query).then((result) => {
        result = result.rows;
        console.log(result);
        res.json({ result });
    });
});

app.get("/welcome", (req, res) => {
    if (req.session.user !== undefined) {
        res.redirect(302, "/welcome");
    }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("*", (req, res) => {
    console.log("user----->", req.session.user);
    if (req.session.user === undefined) {
        res.redirect(302, "/welcome");
    }
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening.");
});

module.exports.getApp = app;
