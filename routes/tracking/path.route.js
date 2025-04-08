const express = require("express");

const TrackingStopModel = require('../../models/tracking/stop.model');
const TrackingPathModel = require('../../models/tracking/path.model');

const { getTrackingPaths, createTrackingPath, updateTrackingPath, deleteTrackingPath } = require("../../controllers/tracking/path.controller");

const router = express.Router();

router.get("/", getTrackingPaths);

router.post("/", createTrackingPath);
router.put("/", updateTrackingPath);
router.delete("/:id", deleteTrackingPath);

router.get("/search", async (req, res) => {
  const { stopId } = req.query;
  console.log("stopId", stopId);
  try {
    const TrackingPaths = await TrackingPathModel.find({ "stops": stopId });

    res.status(200).json({ TrackingPaths });
  } catch (error) {
    console.error("Error fetching TrackingPaths:", error);
    res.status(500).json({ message: "Failed to fetch TrackingPaths", error: error.message });
  }
});

router.get("/byId", async (req, res) => {
  try {
    const TrackingPath = await TrackingPathModel.findById(req.params.id);
    res.status(200).json({ TrackingPath });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch TrackingPath", error: error.message });
  }
});

module.exports = router;
