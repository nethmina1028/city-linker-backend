const BusSchedule = require("../models/busScheduleModel");


const reserveSeats = async (req, res) => {
    try {
      const {  reservationId, bookedSeats } = req.body;
  
      if (!reservationId || !bookedSeats || bookedSeats.length === 0) {
        return res.status(400).json({ message: "Invalid request data" });
      }
  
      const schedule = await BusSchedule.findOne({ _id: reservationId });
  
      if (!schedule) {
        return res.status(404).json({ message: "Schedule not found" });
      }
  
     
      const alreadyBooked = bookedSeats.filter((seat) => schedule.bookedSeats.includes(seat));
  
      if (alreadyBooked.length > 0) {
        return res.status(400).json({ message: `Seats ${alreadyBooked.join(", ")} are already booked!` });
      }
  
      
      schedule.bookedSeats.push(...bookedSeats);
      await schedule.save();
  
      res.status(200).json({ message: "Seats reserved successfully", updatedSeats: schedule.bookedSeats });
    } catch (error) {
      res.status(500).json({ message: "Failed to reserve seats", error: error.message });
    }
  };

  module.exports = { reserveSeats };