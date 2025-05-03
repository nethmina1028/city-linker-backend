const express = require("express");
const {  getRecords } = require("../controllers/recordController");

const router = express.Router();

router.get("/:reservationId", getRecords);

module.exports = router;
