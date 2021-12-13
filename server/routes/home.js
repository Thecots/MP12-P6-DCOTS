const express = require("express");
const cookieParser = require("cookie-parser");
const decode = require('jsonwebtoken/decode');
const {getRole} = require("./../middlewares/auth");
const router = express.Router();
router.use(cookieParser())
const Article = require("../models/article");
const Comment = require("../models/comment");

router.get("/cerrarsesion", async (req, res) =>{
  role = getRole(req)
  res.render("closeSession",
  {
    session: role.user,
    role: role.admin,
    home: true,
  });
});


router.get("/", async (req, res) =>{
  role = getRole(req)
  res.render("home",
  {
    session: role.user,
    role: role.admin,
    home: true,
  });
});

router.get("/home/:id", async (req, res) =>{
  Article.findById( req.params.id, (err,r) => {
    if(err){
      res.render("home");
      return 0;
    }
    Comment.find({idArticle:req.params.id},(err,r)=>{

    })
  })
  role = getRole(req)
  res.render("article",
  {
    session: role.user,
    role: role.admin,
    home: true,
    articleid: req.params.id
  });
});
module.exports = router;
