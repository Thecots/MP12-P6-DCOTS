const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const decode = require('jsonwebtoken/decode');
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
const Comment = require("../../models/comment");
const { send } = require("express/lib/response");
const router = express.Router();
router.use(cookieParser())
const { v4: uuidv4 } = require('uuid');


router.get("/comentarios",[verificaToken,verificaAdminRole], async(req, res) => {
  Article.find({"comments":{"$exists":true}}, (err,x)=>{
    let template = [];
    
    x.forEach(n => {
      n.comments.forEach(e => {
        let d = new Date(e.date)

        const zero = (e)=>{
         if(e <= 9){
           return `0${e}`;
         }else{
           return e;
         }
        }

        template.push({
          article: {
            id: n._id,
            title:n.title,
          },
          comment:{
            id:e.id,
            comment:e.comment,
            author: e.author,
            date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
            pts: `${d.getFullYear()}${zero(d.getMonth())}${zero(d.getDate())}`,
          }
        })
      })
    })
    role= getRole(req);
    res.render("adminComentarios",
    {
      session: role.user,
      role: role.admin,
      admin: true,
      comentarios: true,
      json: template

    });
  });
  
});

router.put("/comentarios",[verificaToken], async(req, res) => {
  let comment = new Comment(
    {
      comment: req.body.comment,
      author: req.body.author,
      idArticle: req.body.idArticle,
    }
  );

  comment.save((err, commentDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      user: commentDB,
    });
  });
});


/* POST */
router.post("/comentarios",[verificaToken,verificaAdminRole], async(req, res) => {
    let s = await Comment.findById('61b0c39485a2b06093d43c51').count();

    console.log(s);
});

module.exports = router;