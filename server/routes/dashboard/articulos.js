const express = require("express");
const {verificaToken, verificaAdminRole,getname} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
const Comment = require("../../models/comment");
const { append } = require("express/lib/response");
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
          article,
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
      console.log(error);
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


module.exports = router;