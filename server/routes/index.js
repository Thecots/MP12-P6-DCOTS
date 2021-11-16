const express = require("express");
const app = express.Router();
const { verificaToken, verificaAdminRole } = require("../middlewares/auth");
const { verificaToken2, verificaAdminRole2 } = require("../middlewares/auth2");


app.get('/',(req,res)=> {
    res.render('login');
})

app.get('/',(req,res)=> {
    res.render('login');
})

app.get('/home',[verificaToken2], (req,res)=>{
    res.render('home')
})

app.use(require("./users"));
app.use(require("./login"));

module.exports = app;
