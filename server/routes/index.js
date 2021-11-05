const express = require("express");
const app = express();

app.get('/',(req,res)=> {
    res.send('<a href="/user">Click</a>')
})
app.use(require("./users"));

module.exports = app;
