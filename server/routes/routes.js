const express = require("express");
const app = express.Router();

app.use(require("./login"))
app.use(require("./users"));
module.exports = app;