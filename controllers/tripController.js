const Trip = require("../models/tripModel");


const addTrip = async (req, res) => {
  try {
    const { from, to, time, number, routeNumber, seats, duration, company, price, facilities,dates} = req.body;

    const trip = new Trip({ from, to, time, number, routeNumber, seats, duration, company, price, facilities,dates});

    await trip.save();
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



const updateTripDates = async (req, res) => {
  try {
    const { id } = req.params;
    const { dates } = req.body;

 
    const updatedTrip = await Trip.findByIdAndUpdate(
      id,
      { $set: { dates } }, 
      { new: true }
    );

    if (!updatedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({ message: "Dates updated successfully!", trip: updatedTrip });
  } catch (error) {
    res.status(500).json({ message: "Failed to update trip dates", error: error.message });
  }
};

module.exports = { addTrip, getTrips, getTripById, updateTripDates };
