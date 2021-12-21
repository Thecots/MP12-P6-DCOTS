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
  Comment.find({},(err,r)=>{
    if(r.length === 0){
      role= getRole(req);
          res.render("adminComentarios",
          {
            session: role.user,
            role: role.admin,
            admin: true,
            comentarios: true,
            json: []
          });
    }
    let t = [];
    r.forEach((g,index) => {
      Article.findById(g.idArticle, (err,n)=>{
        let d = new Date(g.date)
        const zero = (e)=>{
         if(e <= 9){
           return `0${e}`;
         }else{
           return e;
         }
        }
        t.push({
          article: {
            id: n._id,
            title:n.title,
          },
          comment:{
            id:req.id,
            comment:g.comment,
            author: g.author,
            date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
            pts: `${d.getFullYear()}${zero(d.getMonth())}${zero(d.getDate())}`,
          }
        });

        if(r.length-1 === index){
          role= getRole(req);
          res.render("adminComentarios",
          {
            session: role.user,
            role: role.admin,
            admin: true,
            comentarios: true,
            json: t
          });
        }
      });
    });
  }); 
});

router.put("/comentarios",[verificaToken], async(req, res) => {
  let d = new Date();
  let comment = new Comment(
    {
      comment: req.body.comment,
      author: req.usuari.username,
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
      comment: {
        comment: req.body.comment,
        author: req.usuari.username,
        data: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
      },
    });
  });
});


/* POST */
router.post("/comentarios",[verificaToken,verificaAdminRole], async(req, res) => {
  let template = [];
  const art = await Article.find();
  const com = await Comment.find();

  com.forEach(n=> {
    let d = new Date(n.date);
    template.push({
      article: {
        title: art.find(x => x._id == n.idArticle).title,
      },
      comment:{
        id: n._id,
        comment:n.comment,
        author: n.author,
        date: d.getFullYear()+'-'+d.getMonth()+'-'+d.getDate(),
      }
    });
  });
  res.send({
    data: template.reverse()
  })
});

router.delete("/comentarios",[verificaToken,verificaAdminRole], async(req, res) => {
  Comment.find({_id:req.body.id}).deleteOne().exec((err,r)=>{
    if(!err){
      res.send({ok:true})
    }else{
      res.send({ok:false})
    }

  });
});
module.exports = router;