const express = require("express");
const DataController = require("../controllers/DataController");

const router = express.Router();

router.get("/", DataController.getData);

module.exports = router;