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

  role= getRole(req);
  Article.find({},(err,countA)=>{
    let countC = countV = 0;
    if(err){countA = 0}
    /* contar visitas */
    countA.forEach(n =>{
      countV += n.views;
    });
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
