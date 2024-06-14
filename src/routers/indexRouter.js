const path = require("path");

const express = require("express");

const apiRouter = require("./apiRouter.js");

const router = express.Router();

router.use("/api", apiRouter);

router.get("/", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "index.html"));
});
router.get("/explore", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "explore.html"));
});
router.get("/dashboard", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "dashboard.html"));
});
router.get("/user", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "user.html"));
});
router.get("/user/:id", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "user.html"));
});
router.get("/post/:id", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "post.html"));
});
router.get("/folk/:id", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "folk.html"));
});
router.get("/signup", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "signup.html"));
});
router.get("/login", (req, res) => {
    res.status(200).sendFile(path.join(process.env.publicPath, "login.html"));
});

module.exports = router;
