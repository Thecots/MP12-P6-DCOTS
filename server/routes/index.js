const express = require("express");
const app = express.Router();
const { verificaToken, verificaAdminRole } = require("../middlewares/auth");
const { verificaToken2, verificaAdminRole2 } = require("../middlewares/auth2");


app.get('/',(req,res)=> {
    res.render('login',{
        loginJS: true
    });
})

app.get('/',(req,res)=> {
    res.render('login');
})

app.get('/admin', (req,res)=>{
    res.render('admin');
})

app.use(require("./users"));
app.use(require("./login"));

module.exports = app;
