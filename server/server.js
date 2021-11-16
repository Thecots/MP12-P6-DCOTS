console.clear();
require('dotenv').config();
require('colors');
const express = require('express');
const mongoose = require('mongoose');
const exphbs = require("express-handlebars");
const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));

// handlebars
app.set("views", path.join(__dirname, "views"));
app.engine(
  ".hbs",
  exphbs({
    defaultLayout: "main",
    extname: ".hbs",
    partialsDir: __dirname + "/views/layouts",
  })
);
app.set("view engine", ".hbs");

// routes
app.use(require('./routes/index'));

// data base
mongoose.connect(process.env.URLDB,{ useUnifiedTopology: true, useNewUrlParser: true},(err,res)=>{
    if(err) throw err;
    console.log(`data base ${res.connections[0].name} online, port: ${res.connections[0].port}`.cyan);
})

app.listen(process.env.PORT,() =>{
    console.log(`http://localhost:${process.env.PORT}`.green);
})
