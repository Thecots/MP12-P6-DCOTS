const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {verificaToken, verificaAdminRole} = require('./../middlewares/auth')
const cookieParser = require("cookie-parser");


const router = express.Router();
router.use(cookieParser())

router.get("/admin",[verificaToken,verificaAdminRole],(req, res) => {
  res.render("admin");
});
module.exports = router;
