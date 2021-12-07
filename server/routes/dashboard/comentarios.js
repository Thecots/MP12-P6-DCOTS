const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const decode = require('jsonwebtoken/decode');
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
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
  Article.updateOne({_id:req.body.id},{$push:{comments: {id: uuidv4(), author: req.body.author, comment: req.body.comment,date: new Date()}}},(err)=>{
    if(err){
      return res.status(400).json({
        ok: false,
      });
    }
    res.json({
      ok: true,
    });
  });
});


/* POST */
router.post("/comentarios",[verificaToken,verificaAdminRole], async(req, res) => {
    let s = await Article.findById('61ad0d60e2832b790d68af94');

    console.log(s);
});

module.exports = router;