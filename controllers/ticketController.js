const Tickets = require("../models/booking");
const BusSchedule = require("../models/busScheduleModel");
const Trip = require("../models/tripModel");
const mongoose = require("mongoose");



const getTickets = async (req, res) => {
    const userId = req.params.userId;
    try {
      const bookings = await Tickets.find({ userId });
   
      const detailedTickets = await Promise.all(
        bookings.map(async (booking) => {
          
          const scheduleId = new mongoose.Types.ObjectId(booking.selectedId);
          
          const busSchedule = await BusSchedule.findById(scheduleId).lean();
          if (!busSchedule) return null;
  
          const trip = await Trip.findById(busSchedule.tripId).lean();
          if (!trip) return null;
  
          return {
            _id: booking._id, 
            bookId: booking.bookId,
            number: trip.number,
            from: trip.from,
            to: trip.to,
            time: trip.time,
            date: busSchedule.date,
            bookedSeats: booking.selectedSeats,
            status: booking.status,
          };
        })
      );


      const filteredTickets = detailedTickets.filter((ticket) => ticket !== null);




      res.status(200).json(filteredTickets);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };


  module.exports = { getTickets};
