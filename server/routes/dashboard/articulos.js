const express = require("express");
const {verificaToken, verificaAdminRole,getname} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
const Comment = require("../../models/comment");
const { append } = require("express/lib/response");
const { Mongoose } = require("mongoose");
const router = express.Router();
router.use(cookieParser())

/* GET */
router.get("/articulos",[verificaToken,verificaAdminRole], (req, res) => {
    const role = getRole(req);
    res.render('adminArticulos', {
      session: role.user,
      role: role.admin,
      admin: true,
      articulos: true
    });
  });


/* POST */
router.post("/articulos",[verificaToken,verificaAdminRole], async(req, res) => {
    Article.find().exec((err, article) => {
        if (err) {
          return res.status(400).json({
            ok: false,
            err,
          });
        }
        res.json({
          ok: true,
        });
      });
  });

/* PUT */
router.put("/articulos",[verificaToken,verificaAdminRole], async(req, res) => {
    let body = req.body;
    let article = new Article({
      title: body.title,
      content: body.content,
      author: getname(req),
    });
  
    article.save((err, articleDB) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }
      res.json({
        ok: true,
        user: articleDB,
      });
    });
});

/* DELETE */
router.delete("/articulos", [verificaToken, verificaAdminRole], async(req,res) => {
    try {
      await Comment.deleteMany({idArticle:req.body.id});
      await Article.deleteOne({_id: req.body.id});
      res.send({ok:true})
    } catch (error) {
      res.send({ok:false})
    }
})
    
router.post("/comentariosShow", [verificaToken, verificaAdminRole], async(req,res) => {
  let template = [];

  const art = await Article.find({},"_id title author views date");
  const com = await Comment.find();

  art.forEach(n=>{
    const d = new Date(n.date);
    template.push({
      title: n.title,
      author: n.author,
      date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      id: n._id,
      views: n.views,
      comments: com.filter(x=> x.idArticle == n._id).length
    });
  })
  res.send({data:template.reverse()})
});

router.get('/articulos/create', [verificaToken, verificaAdminRole],(req,res)=>{
  const role = getRole(req);
  res.render('crearArticulo', {
    session: role.user,
    role: role.admin,
    admin: true,
    newarticulo: true,
  });
})

router.get('/edit/:id', [verificaToken,verificaAdminRole], async(req,res)=>{
  const role = getRole(req);
  try {
    const art = await Article.findById(req.params.id);
    res.render('adminEditArticle',{
      session: role.user,
      role: role.admin,
      admin: true,
      newarticulo: true,
      json: {
        id: art._id,
        title: art.title,
        content: art.content
      }
    })
  } catch (error) {
    res.redirect("/articulos")
  }
})

router.post('/editarticle',  [verificaToken,verificaAdminRole], async(req,res)=>{
    try {
      await Article.findByIdAndUpdate(req.body.id,{title:req.body.title, content: req.body.content})
      res.send({ok:true});
    } catch (error) {
      res.send({ok:false});
    }
})


module.exports = router;