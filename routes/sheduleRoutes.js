const express = require("express");
const { getSchedules,getSchedulesByTripId } = require("../controllers/scheduleController");

const router = express.Router();


router.get("/", getSchedules);
router.get("/:id", getSchedulesByTripId); 


module.exports = router;
