const express = require("express");
const { addTrip, getTrips, getTripById,addTripDates } = require("../controllers/tripController");

const router = express.Router();

router.post("/", addTrip);
router.get("/", getTrips);
router.get("/:id", getTripById);
router.post("/:id/add-dates", addTripDates); 

module.exports = router;
