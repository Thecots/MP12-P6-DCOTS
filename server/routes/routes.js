const express = require("express");
const app = express.Router();

app.use(require("./login"));
app.use(require("./admin"));
app.use(require("./home"));
app.use(require("./users"));

module.exports = app;
