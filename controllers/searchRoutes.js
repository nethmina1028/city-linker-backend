const Trip = require("../models/tripModel");


const getRoutes = async (req, res) => {
    try {
		const { from, to, date } = req.query;

		if (!from || !to) {
			return res.status(400).json({ message: "Both 'from' and 'to' are required." });
		}

		
		let query = { from, to };
		if (date) {
			query.dates = { $in: [date] }; 
		}

		const trips = await Trip.find(query);

		if (trips.length === 0) {
			return res.status(404).json({ message: "No trips found." });
		}

		res.status(200).json(trips);
	} catch (error) {
		res.status(500).json({ message: "Server error", error: error.message });
	}
}

module.exports = { getRoutes };
