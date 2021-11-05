const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const app = express();

app.get("/user", (req, res) => {
    User.find({}, "username email").exec((err, usuaris) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
  
      res.json({
        ok: true,
        usuaris,
      });
    });
  });
  
  app.post("/user", (req, res) => {
    let body = req.body;
    let user = new User({
      username: body.username,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
    });
  
    //   if (!bcrypt.compareSync(body.password, "asdf")) {
    //     console.log("el password és ASDF");
    //   }
  
    user.save((err, userDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
  
      res.json({
        ok: true,
        user: userDB,
      });
    });
  });
  
  module.exports = app;
  