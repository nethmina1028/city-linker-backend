const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  time: { type: String, required: true },
  number: { type: String, required: true },
  routeNumber: { type: String, required: true },
  seats: { type: Number, required: true },
  duration: { type: String, required: true },
  company: { type: String, required: true },
  price: { type: Number, required: true },
  facilities: [String], 
}, { timestamps: true });

const Trip = mongoose.model("Trip", tripSchema);

module.exports = Trip;
