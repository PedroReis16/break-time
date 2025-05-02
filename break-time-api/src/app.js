require("dotenv").config();

const healthCheckRoutes = require("./routes/healthCheckRoutes");
const studentRoutes = require("./routes/studentRoutes");
const dishRoutes = require("./routes/dishRoutes");


const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/health-check", healthCheckRoutes);
app.use("/alunos", studentRoutes);
app.use("/pratos", dishRoutes);

// Middle to static files
app.use("/assets", express.static(path.join(__dirname, "assets")));

module.exports = app;
