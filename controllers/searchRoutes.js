const Trip = require("../models/tripModel");
const BusSchedule = require("../models/busScheduleModel");

const getRoutes = async (req, res) => {
    try {
        const { from, to, date } = req.query;

        if (!from || !to) {
            return res.status(400).json({ message: "Both 'from' and 'to' are required." });
        }

        // Find trips matching the 'from' and 'to' criteria
        const trips = await Trip.find({ from, to });

        if (trips.length === 0) {
            return res.status(404).json({ message: "No trips found." });
        }

        // Extract tripIds from the found trips
        const tripIds = trips.map(trip => trip._id);

        let scheduleQuery = { tripId: { $in: tripIds } };

        // If a date is provided, filter by it
        if (date) {
            scheduleQuery.date = date;
        }

        // Find matching bus schedules
        const schedules = await BusSchedule.find(scheduleQuery).populate("tripId");

        if (schedules.length === 0) {
            return res.status(404).json({ message: "No schedules found for the given criteria." });
        }

        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

module.exports = { getRoutes };

