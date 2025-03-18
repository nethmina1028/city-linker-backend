const BusSchedule = require("../models/busScheduleModel");

// Get all bus schedules with trip details
const getSchedules = async (req, res) => {
  try {
    const schedules = await BusSchedule.find().populate("tripId");
    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
  }
};

module.exports = { getSchedules };
