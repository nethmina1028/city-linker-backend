const express = require("express");
const { addTrip, getTrips, getTripById,updateTripDates } = require("../controllers/tripController");

const router = express.Router();

router.post("/", addTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);
router.put("/:id/update-dates", updateTripDates); 

module.exports = router;
