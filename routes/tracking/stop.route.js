const express = require("express");

const TrackingStopModel = require('../../models/tracking/stop.model');
const { getTrackingStops, createTrackingStop, updateTrackingStop, deleteTrackingStop } = require("../../controllers/tracking/stop.controller");

const router = express.Router();

router.get("/", getTrackingStops);
router.post("/", createTrackingStop);
router.put("/", updateTrackingStop);
router.delete("/:id", deleteTrackingStop);

router.get("/search", async (req, res) => {
  const { lat, lon, delta = 0.01 } = req.query;

  console.log("lat", lat);

  try {
    if (!lat || !lon || !delta) {
      return res.status(400).json({ message: "Missing required parameters" });
    }

    const TrackingStops = await TrackingStopModel.find(
      {
        'location.lat': {
          '$gt': parseFloat(lat) - parseFloat(delta),
          '$lt': parseFloat(lat) + parseFloat(delta)
        },
        'location.lon': {
          '$gt': parseFloat(lon) - parseFloat(delta),
          '$lt': parseFloat(lon) + parseFloat(delta)
        }
      }
    );

    res.status(200).json({ TrackingStops });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch TrackingStops", error: error.message });
  }
}
);

module.exports = router;
