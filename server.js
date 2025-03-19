const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const tripRoutes = require("./routes/tripRoutes");
const scheduleRoutes = require("./routes/sheduleRoutes");
const reserveSeats = require("./routes/reserveSeats");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();
connectDB();

const app = express();


app.use(
  cors({
      origin: '*',
      
  })    
);

app.use(express.json());

app.use("/api/trips", tripRoutes);
app.use("/api/shedules", scheduleRoutes);
app.use("/api/reserve",reserveSeats );

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
