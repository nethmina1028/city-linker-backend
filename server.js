const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");

const { payment } = require("paypal-rest-sdk");

const connectDB = require("./config/db");

const tripRoutes = require("./routes/tripRoutes");
const scheduleRoutes = require("./routes/sheduleRoutes");
const reserveSeats = require("./routes/reserveSeats");
const searchRoutes = require("./routes/searchRoutes");
const paymentRoutes = require("./routes/payment");
const ticketRoutes = require("./routes/ticketRoutes");
const recordRoutes = require("./routes/recordRoutes");
const bannerRoutes = require("./routes/bannerRoutes");
const userRoutes = require("./routes/userRoutes");
const trackingRoutes = require("./routes/tracking.route");

const { errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use("/api/trips", tripRoutes);
app.use("/api/shedules", scheduleRoutes);
app.use("/api/reserve", reserveSeats);
app.use("/api/search", searchRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/tickets", ticketRoutes);
app.use("/api/records", recordRoutes);
app.use("/api/banner", bannerRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tracking", trackingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
