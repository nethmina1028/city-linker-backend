const express = require("express");
const { getSchedules } = require("../controllers/scheduleController");

const router = express.Router();

router.get("/", getSchedules);

module.exports = router;
