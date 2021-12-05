const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
const router = express.Router();
router.use(cookieParser())

/* GET */
router.get("/articulos",[verificaToken,verificaAdminRole], async(req, res) => {
  role= getRole(req);
  res.render("adminArticulos",
  {
    session: role.user,
    role: role.admin,
    admin: true,
    articulos: true
  });
});

/* POST */
router.post("/articulos",[verificaToken,verificaAdminRole], async(req, res) => {
    console.log(1);
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