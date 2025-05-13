const express = require("express");
const { addTrip, getTrips, getTripById,addTripDates,countDocuments,deleteTrip } = require("../controllers/tripController");

const router = express.Router();

router.post("/", addTrip);
router.get("/", getTrips);
router.get("/count/:userId", countDocuments); 
router.get("/:id", getTripById);
router.delete("/:id", deleteTrip);
router.post("/:id/add-dates", addTripDates); 

module.exports = router;
