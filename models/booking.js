const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  // userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  // operatorId: { type: mongoose.Schema.Types.ObjectId, ref: "Operator", required: true },
  // busId: { type: mongoose.Schema.Types.ObjectId, ref: "Bus", required: true },
  
  userId: { type: String, required: true },
  operatorId: { type: String, required: true },
  selectedId: { type: String, required: true },
  selectedSeats: { type: [String], required: true },
  totalAmount: { type: Number, required: true },
  adminFee: { type: Number, required: true },
  operatorFee: { type: Number, required: true },
  paymentId: { type: String  },
  status: { type: String, enum: ["Pending", "Paid", "Cancelled"], default: "Pending" },
  bookId: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Booking", bookingSchema);
