const Router = require("express");
const router = new Router();

const userRouter = require("./userRouter");
const applicationRouter = require("./applicationRouter");
const dogovorInfoRouter = require("./dogovorInfoRouter");
const taskRouter = require("./taskRouter");
const routeGroupRouter = require("./routeGroupRouter");
const routeRouter = require("./routeRouter");
const statusRouter = require("./statusRouter");
const kontragentRouter = require("./kontragentRouter");

router.use("/user", userRouter);
router.use("/application", applicationRouter);
router.use("/dogovorInfo", dogovorInfoRouter);
router.use("/task", taskRouter);
router.use("/route", routeRouter);
router.use("/routeGroup", routeGroupRouter);
router.use("/status", statusRouter);
router.use("/kontragent", kontragentRouter);

module.exports = router;
