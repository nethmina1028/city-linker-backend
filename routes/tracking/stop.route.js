const express = require("express");

const { getTrackingStops, createTrackingStop, updateTrackingStop, deleteTrackingStop } = require("../../controllers/tracking/stop.controller");

const router = express.Router();

router.get("/", getTrackingStops);
router.post("/", createTrackingStop);
router.put("/", updateTrackingStop);
router.delete("/:id", deleteTrackingStop);

module.exports = router;
