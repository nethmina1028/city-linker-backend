const express = require("express");

const { getTrackingPaths, createTrackingPath, updateTrackingPath, deleteTrackingPath } = require("../../controllers/tracking/path.controller");

const router = express.Router();

router.get("/", getTrackingPaths);
router.post("/", createTrackingPath);
router.put("/", updateTrackingPath);
router.delete("/:id", deleteTrackingPath);

module.exports = router;
