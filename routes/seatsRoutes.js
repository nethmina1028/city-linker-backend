const express = require("express");
const router = express.Router();
const BusSchedule = require("../models/busScheduleModel"); 

router.post("/check", async (req, res) => {
  try {
    const { selectedId, selectedSeats } = req.body;

    if (!selectedId || !selectedSeats || !Array.isArray(selectedSeats)) {
      return res.status(400).json({ error: "Invalid data format." });
    }

   
    const busSchedule = await BusSchedule.findById(selectedId);

    if (!busSchedule) {
      
      return res.status(404).json({ error: "Bus schedule not found." });
    }

    // Check if any selected seats are already in bookedSeats
    const alreadyReservedSeats = selectedSeats.filter(seat =>
      busSchedule.bookedSeats.includes(seat)
    );

    if (alreadyReservedSeats.length > 0) {
      return res.json({ alreadyReserved: true, alreadyReservedSeats });
    }

    return res.json({ alreadyReserved: false });
  } catch (error) {
    console.error("Seat check error:", error);
    res.status(500).json({ error: "Server error while checking seats." });
  }
});

module.exports = router;
