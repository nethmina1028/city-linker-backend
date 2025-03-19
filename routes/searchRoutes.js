const express = require("express");
const {  getRoutes } = require("../controllers/searchRoutes");

const router = express.Router();
router.get("/", getRoutes);
module.exports = router;