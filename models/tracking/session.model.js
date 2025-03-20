const mongoose = require("mongoose");

const trackingSessionSchema = new mongoose.Schema({
  pathId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Path",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
});

const TrackingSessionModel = mongoose.model("Session", trackingSessionSchema);

module.exports = TrackingSessionModel;
