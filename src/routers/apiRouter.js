const express = require("express");

const userRouter = require("./userRouter.js");
const folkRouter = require("./folkRouter.js");
const postRouter = require("./postRouter.js");
const chartRouter = require("./chartRouter.js");

const router = express.Router({mergeParams: true});

router.use("/user", userRouter);
router.use("/folk", folkRouter);
router.use("/post", postRouter);
router.use("/chart", chartRouter);

module.exports = router;
