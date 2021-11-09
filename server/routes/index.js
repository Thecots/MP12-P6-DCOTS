const express = require("express");
const app = express();

app.get('/',(req,res)=> {
    res.send('<a href="/user">Usuarios</a>')
})

app.use(require("./users"));
app.use(require("./clients"));
app.use(require("./serveis"));

module.exports = app;
