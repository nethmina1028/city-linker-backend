const BusSchedule = require("../models/busScheduleModel");


const getSchedules = async (req, res) => {
  try {
    const schedules = await BusSchedule.find().populate("tripId");
    res.status(200).json({ schedules });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedules", error: error.message });
  }
};


const getSchedulesByTripId = async (req, res) => {
  try {
    const { id: tripId } = req.params; 
    const schedules = await BusSchedule.find({ tripId });
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch schedules by trip ID", error: error.message });
  }
};





module.exports = { getSchedules,getSchedulesByTripId };
