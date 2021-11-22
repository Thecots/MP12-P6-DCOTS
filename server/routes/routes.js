const express = require("express");
const app = express.Router();

app.use(require("./login"));
app.use(require("./users"));

app.get("/admin", (req, res) => {
  console.log(req.get("X-Access-Token"));
  res.send("hola");
});

module.exports = app;
