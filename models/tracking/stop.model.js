const mongoose = require("mongoose");

const trackingStopSchema = new mongoose.Schema({
  label: { type: String, required: true },
  location: { type: [Number], required: true },
  type: { type: String, required: true },
  description: { type: String },
  facilities: [String],
}, { timestamps: true });

const TrackingStopModel = mongoose.model("Stop", trackingStopSchema);

module.exports = TrackingStopModel;
