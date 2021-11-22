const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/home", (req, res) => {
  res.render("user");
});
router.post("/home", (req, res) => {
  jwt.verify(req.get("X-Access-Token"), process.env.SEED, (err, decoded) => {
    if (err) {
      res.json({
        ok: false,
      });
    }
    if (jwt.decode(req.get("X-Access-Token")).usuari.role == "ADMIN_ROLE") {
      res.json({
        ok: true,
        admin: true,
      });
    } else {
      res.json({
        ok: true,
        admin: false,
      });
    }
  });
});
module.exports = router;
