const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {verificaTokenLogin} = require('./../middlewares/auth')
const cookieParser = require("cookie-parser");
const router = express.Router();
router.use(cookieParser())


/* GET */
router.get("/login",verificaTokenLogin, (req, res) => {
  res.render("login",{login: true});
});

/* POST */
router.post("/login",verificaTokenLogin, (req, res) => {
  let body = req.body;
  User.findOne({ username: body.username }, (err, userDB) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err,
      });
    }

    if (!userDB) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "(Usuari) o contrasenya incorrectes",
        },
      });
    }

    if (!bcrypt.compareSync(body.password, userDB.password)) {
      return res.status(400).json({
        ok: false,
        err: {
          message: "Usuari o (contrasenya) incorrectes",
        },
      });
    }

    let token = jwt.sign(
      {
        usuari: userDB,
      },
      process.env.SEED,
      {
        expiresIn: process.env.CADUCITAT_TOKEN,
      }
    );
    res.setHeader("X-Access-Token", token);
    return res.json({
      ok: true,
      usuari: userDB,
      token,
    });
  });
});

module.exports = router;
