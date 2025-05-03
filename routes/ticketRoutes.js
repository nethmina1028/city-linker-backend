const express = require("express");
const {  getTickets } = require("../controllers/ticketController");

const router = express.Router();

router.get("/:userId", getTickets);

module.exports = router;
