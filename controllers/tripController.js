const Trip = require("../models/tripModel");

// @desc    Add new trip
// @route   POST /api/trips
// @access  Public
const addTrip = async (req, res) => {
  try {
    const { from, to, time, number, routeNumber, seats, duration, company, price, facilities } = req.body;

    const trip = new Trip({ from, to, time, number, routeNumber, seats, duration, company, price, facilities });

    await trip.save();
    res.status(201).json({ message: "Trip added successfully!", trip });
  } catch (error) {
    res.status(500).json({ message: "Failed to add trip", error: error.message });
  }
};

// @desc    Get all trips
// @route   GET /api/trips
// @access  Public
const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.status(200).json(trips);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch trips", error: error.message });
  }
};

// @desc    Get single trip
// @route   GET /api/trips/:id
// @access  Public
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

module.exports = { addTrip, getTrips, getTripById };
