const express = require("express");
const bcrypt = require("bcryptjs");
const Servei = require("../models/servei");
const app = express();

/* get */
app.get("/servei", (req, res) => {
    Servei.find().exec((err, serveis) => {
        if (err) {
        return res.status(400).json({
            ok: false,
            err,
        });
        }
        res.json({
            ok: true,
            serveis,
        });
    });
});

module.exports = app;
