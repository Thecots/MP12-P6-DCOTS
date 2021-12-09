const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
const Comment = require("../../models/comment");
const router = express.Router();
router.use(cookieParser())

/* GET */
router.get("/articulos",[verificaToken,verificaAdminRole], (req, res) => {
  Article.find({},"_id title author views date").exec((err, article) => {
    let template = [];
    article.forEach(n =>  { 
      let a = Comment.find({idArticle:n._id.valueOf()},(err,r)=>{ return r.length;});
      console.log(a);

      var d = new Date(n.date);
      template.push({
      title: n.title,
      author: n.author,
      views: n.views,
      date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
      id: n._id,
      comments: 0
    });
    });
    role= getRole(req);
    res.render("adminArticulos",
    {
      session: role.user,
      role: role.admin,
      admin: true,
      articulos: true,
      json: template
    });
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
      author: body.author,
      role: body.role
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
router.delete("/articulos", [verificaToken, verificaAdminRole],(req,res) => {
    User.deleteOne({_id: req.body.id}, (err) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      };
  
      res.json({
        ok: true,
      });
    });
})
    

module.exports = router;