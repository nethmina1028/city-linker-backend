const Tickets = require("../models/booking");
const BusSchedule = require("../models/busScheduleModel");
const Trip = require("../models/tripModel");
const mongoose = require("mongoose");


//const trip = await Tickets.findById(req.params.reservationId).populate("tripId").populate("scheduleId").populate("userId");
const getRecords = async (req, res) => {
  const selectedId = req.params.reservationId;
  try {
    const bookings = await Tickets.find({ selectedId }).select("selectedSeats totalAmount date bookId");

  const results = await Promise.all(
  bookings.map(async (booking) => {
    const schedule = await BusSchedule.findById(booking.selectedId).populate("tripId", "company");

    return {
      selectedSeats: booking.selectedSeats,
      totalAmount: booking.totalAmount,
      date: booking.date,
      bookId: booking.bookId,
      company: schedule?.tripId?.company || null
    };
  })
);

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


  module.exports = { getRecords};
