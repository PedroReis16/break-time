require("dotenv").config();

const healthCheckRoutes = require("./routes/healthCheckRoutes");

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
app.use("/health-check", healthCheckRoutes);

// Middle to static files
const path = require("path");
app.use("/assets", express.static(path.join(__dirname, "assets")));

module.exports = app;
