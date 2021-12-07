const express = require("express");
const cookieParser = require("cookie-parser");
const decode = require('jsonwebtoken/decode');
const {getRole} = require("./../middlewares/auth");
const router = express.Router();
router.use(cookieParser())

router.get("/", async (req, res) =>{
  role = getRole(req)
  res.render("home",
  {
    session: role.user,
    role: role.admin,
    home: true,
  });
});

router.get("/home/:id", async (req, res) =>{
  role = getRole(req)
  res.render("home",
  {
    session: role.user,
    role: role.admin,
    home: true,
  });
});
module.exports = router;
