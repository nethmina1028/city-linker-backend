const Tickets = require("../models/booking");
const BusSchedule = require("../models/busScheduleModel");
const Trip = require("../models/tripModel");
const mongoose = require("mongoose");


const getRecords = async (req, res) => {
  const selectedId = req.params.reservationId;
  try {
    const bookings = await Tickets.find({ selectedId }).select("selectedSeats totalAmount date bookId");
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  module.exports = { getRecords};
