const express = require("express");

const { getTrackingStops } = require("../../controllers/tracking/stop.controller");

const router = express.Router();

router.get("/", getTrackingStops);

module.exports = router;
