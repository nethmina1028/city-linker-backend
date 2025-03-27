const mongoose = require("mongoose");

const trackingPathSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  stops: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stop",
    },
  ],
});

const TrackingPathModel = mongoose.model("Path", trackingPathSchema);

module.exports = TrackingPathModel;
