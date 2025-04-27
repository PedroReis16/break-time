require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));

// Routes
const healthCheckRoutes = require("./routes/healthCheckRoutes");

app.use("/health-check", healthCheckRoutes);

module.exports = app;
