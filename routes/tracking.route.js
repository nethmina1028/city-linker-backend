const express = require("express");

const trackingStopRoutes = require("./tracking/stop.route");
// const trackingPathRoutes = require("./tracking/path.route");

const router = express.Router();

router.use("/stop", trackingStopRoutes);
// router.use("/path", trackingPathRoutes);

module.exports = router;
