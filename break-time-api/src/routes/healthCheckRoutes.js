const express = require("express");
const router = express.Router();
const checkController = require("../controllers/healthCheckController");

router.get("/", checkController.healthCheck);

module.exports = router;
