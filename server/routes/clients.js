const express = require("express");
const bcrypt = require("bcryptjs");
const Client = require("../models/client");
const app = express();

/* get */
app.get("/client", (req, res) => {
    Client.find().exec((err, clients) => {
        if (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
        }
        res.json({
        ok: true,
        clients,
        });
    });
});

/* put */
app.put("/client", (req, res) => {
    const {username, name, lastname, email, password, phone, adress} = req.body;
    //console.log({username, name, lastname, email, password, phone, adress});
    let client = new Client({
      username,
      name,
      lastname,
      email,
      password: bcrypt.hashSync(password, 10),
      phone,
      adress,
    });
  
    client.save((err, clientDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        user: clientDB,
      });
    });
});

/* delete*/
app.delete("/client",(req,res) => {
    Client.deleteOne({_id: req.body.id}, (err) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      };
  
      res.json({
        ok: true,
      });
    });
})
module.exports = app;
  