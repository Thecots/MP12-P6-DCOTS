const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("user");
});


module.exports = router;
