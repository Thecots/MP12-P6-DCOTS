const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../middlewares/auth");
const router = express.Router();
router.use(cookieParser())
const Article = require("../models/article");
const Comment = require("../models/comment");
const User = require("../models/user");


/* inicio */
router.get("/admin",[verificaToken,verificaAdminRole], async(req, res) => {
  const articulos = await Article.find().countDocuments();
  const comentarios = await Comment.find().countDocuments();
  const comentarios2 = await Comment.find();

  role= getRole(req);
  Article.find({},(err,countA)=>{
    let countC = countV = 0;
    if(err){countA = 0}
    /* contar visitas */
    countA.forEach(n =>{
      countV += n.views;
    });

    
    let lastpost = []
    for(let i = countA.length-1; i > countA.length-6; i--){
      lastpost.push({
        title:countA[i].title,
        author:countA[i].author,
        comment: comentarios2.filter(n=> n.idArticle == countA[i]._id).length,
        views: countA[i].views,
        id: countA[i]._id
      })
    }
    lastcoment = [];
    for(let i = comentarios2.length-1; i > comentarios2.length-6; i--){
      lastcoment.push({
        title: countA.filter(n=>n._id == comentarios2[i].idArticle)[0].title,
        author:comentarios2[i].author,
        comment: comentarios2[i].comment,
        id: comentarios2[i].idArticle
      })
    }

    countA = countA.length;
    Comment.count({},(err,countC)=>{
      /* contar comentarios */
      
      User.count({},(err,countU)=>{
        if(err){countU = 0}
        res.render("admin",{
          session: role.user,
          role: role.admin,
          admin: true,
          inicio: true,
          countA: articulos,
          countC: comentarios,
          countU,
          countV,
          lastpost,
          lastcoment
        });
      });
    });
  });
});

/* articulos */
router.use(require("./dashboard/articulos"))


/* comentarios */
router.use(require("./dashboard/comentarios"))

/* usuarios */
router.get("/usuarios",[verificaToken,verificaAdminRole], async(req, res) => {
  role= getRole(req);
  res.render("adminUsuarios",
  {
    session: role.user,
    role: role.admin,
    admin: true,
    usuarios: true,
  });
});



module.exports = router;
