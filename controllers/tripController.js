const Trip = require("../models/tripModel");
const BusSchedule = require("../models/busScheduleModel");

const addTrip = async (req, res) => {
  try {
    const { from, to, time, number, routeNumber, seats, duration, company, price, facilities,dates} = req.body;

    const trip = new Trip({ from, to, time, number, routeNumber, seats, duration, company, price, facilities,dates});
    await trip.save();
  
       // Create bus schedules for each date
       const schedules = dates.map(date => ({
        tripId: trip._id,
        date,
        seatsAvailable: seats
      }));

      await BusSchedule.insertMany(schedules);

    res.status(201).json({ message: "Trip added successfully!", trip });
  } catch (error) {
    res.status(500).json({ message: "Failed to add trip", error: error.message });
  }
};


const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};


const getTripById = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }
    res.status(200).json(trip);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trip", error: error.message });
  }
};



// Update Trip Dates & Sync Schedules
const updateTripDates = async (req, res) => {
  try {
    const { id } = req.params;
    const { dates } = req.body;

    // Find existing trip
    const trip = await Trip.findById(id);
    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    // Remove old schedules
    await BusSchedule.deleteMany({ tripId: id });

    // Update trip dates
    trip.dates = dates;
    await trip.save();

    // Recreate bus schedules
    const schedules = dates.map(date => ({
      tripId: id,
      date,
      seatsAvailable: trip.seats
    }));

    await BusSchedule.insertMany(schedules); // Insert updated schedules

    res.status(200).json({ message: "Dates updated successfully!", trip });
  } catch (error) {
    res.status(500).json({ message: "Failed to update trip dates", error: error.message });
  }
};

module.exports = { addTrip, getTrips, getTripById, updateTripDates };
