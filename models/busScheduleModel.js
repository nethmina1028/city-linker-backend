const mongoose = require("mongoose");

const busScheduleSchema = new mongoose.Schema({
  tripId: { type: mongoose.Schema.Types.ObjectId, ref: "Trip", required: true },
  date: { type: String, required: true },
  seatsAvailable: { type: Number, required: true },
  bookedSeats: { type: [String], default: [] },
});

const BusSchedule = mongoose.model("BusSchedule", busScheduleSchema);
module.exports = BusSchedule;
