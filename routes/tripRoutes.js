const express = require("express");
const { addTrip, getTrips, getTripById } = require("../controllers/tripController");

const router = express.Router();

router.post("/", addTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);

module.exports = router;
