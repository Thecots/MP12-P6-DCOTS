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

  Article.findById(req.params.id, async (err,r) => {
    if(err){
      res.redirect("/");
      return 0;
    }
    await Article.updateOne({ _id:req.params.id}, { $set: { views: r.views+1 } })
    Comment.find({idArticle:r._id},(err, f) => {
      let template = [];
      if(f.length == 0){
        let d = new Date(r.date);
        role = getRole(req)
        res.render("article",
        {
          articleC : true,
          session: role.user,
          role: role.admin,
          articlesee: true,
          json: {
            article: {
              id: r._id,
              author: r.author,
              title: r.title,
              content: r.content,
              views: r.views+1,
              date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
            },
            comentNum: 0
          }
        });
      }
      f.forEach((x,index) => {
        let dd = new Date(x.date);
        template.push({
          author: x.author,
          content: x.comment,
          date: `${dd.getDate()}/${dd.getMonth()}/${dd.getFullYear()}`
        })
        if(f.length-1 == index){
          let d = new Date(r.date);
          role = getRole(req)
          res.render("article",
          {
            articleC : true,
            session: role.user,
            role: role.admin,
            articlesee: true,
            json: {
              article: {
                id:r._id,
                author: r.author,
                title: r.title,
                content: r.content,
                views: r.views+1,
                date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
              },
              comment: template,
              comentNum: f.length
            }
          });
        }
      })     
    })
  })
});
module.exports = router;
