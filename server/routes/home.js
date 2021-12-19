const express = require("express");
const cookieParser = require("cookie-parser");
const decode = require('jsonwebtoken/decode');
const {getRole} = require("./../middlewares/auth");
const router = express.Router();
router.use(cookieParser())
const Article = require("../models/article");
const Comment = require("../models/comment");
const article = require("../models/article");
const { append } = require("express/lib/response");

router.get("/cerrarsesion", async (req, res) =>{
  role = getRole(req)
  res.render("closeSession",
  {
    session: role.user,
    role: role.admin,
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
              date: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
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
          date: `${dd.getDate()}/${dd.getMonth()+1}/${dd.getFullYear()}`
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
                date: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`
              },
              comment: template.reverse(),
              comentNum: f.length
            }
          });
        }
      })     
    })
  })
});
module.exports = router;


router.post('/getHomeArticles',async(req,res)=>{
  let template = [];
  const art = await Article.find().sort({sort: -1});
  const com = await Comment.find();

  art.forEach((n,i)=>{
    let d = new Date(n.date);
    template.push({
      id: n._id,
      title: n.title,
      author: n.author,
      date: `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`,
      views: n.views,
      comments: com.filter(x => x.idArticle == n._id).length,
      sort: n.sort
    });
  })
  res.send({
    ok:true,
    json: JSON.stringify(template.sort((a,b)=> a.sort -b.sort).reverse())
  })
})

 