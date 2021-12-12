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
    article.forEach((n,index) =>  { 
      Comment.find({idArticle: n._id.valueOf() }, (err, r)=>{
        const d = new Date(n.date);
        template.push({
          title: n.title,
          author: n.author,
          date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
          id: n._id,
          comments: r.length
        });
        if (index === article.length-1) { 
          const role = getRole(req);
          res.render('adminArticulos', {
            session: role.user,
            role: role.admin,
            admin: true,
            articulos: true,
            json: template
          });
        };
      });
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



/* 
  Solución 1:
  Article.find({}, '_id title author').exec((err, article) => {
    let template = [];
    article.forEach((n, index) => {
      Comment.find({ idArticle: n._id.valueOf() }, (err, r) => { // No haria falta el valueOf() si en el Schema de mongoose lo has definido como ObjectId
        const d = new Date(n.date);
        template.push({
          title: n.title,
          author: n.author,
          date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
          id: n._id,
          comments: r.length
        });

        if (index === article.length) { // Cuando es el ultimo Articulo enviamos la respuesta
          const role = getRole(req);
          res.render('adminArticulos', {
            session: role.user,
            json: template
          });
        }
      });
    });
  });


  Solución 2:
  
  module.exports = async (req, res) => { // Añadimos la anotación de async para indicar que esta función es asíncrona
  const articles = await Article.find({}, '_id title author'); // A cada petición asíncrona añadimos await para que espere a que se resuelva la promesa para continuar con el hilo de ejecución.

  let template = articles.map(async (n) => {
    const comments = await Comment.countDocuments({ idArticle: n._id }); // Utilizon el meted countDocuments que nos devuelve el numero de resultados obtenidos.

    const d = new Date(n.date);

    return {
      title: n.title,
      author: n.author,
      date: `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`,
      id: n._id,
      comments: comments
    };
  });

  const role = getRole(req);

  res.render('adminArticulos', {
    session: role.user,
    json: template
  });
};

Solución 3:

module.exports = async (req, res) => {
  const template = await Article.aggregate([
    {
      $lookup: { // Etapa para realizar un join con la colección Comments
        from: 'comments', // Nombre de la colección
        localField: '_id', // El nombre del campo al cual emparejar con la otra colección
        foreignField: 'idArticle', // El nombre del campo de la colección a emparejar
        as: 'comments' // Nombre del campo que quieres que se devuelvan los resultados
      }
    },
    {
      $project: { // Etapa para procesar la devolución de los campos de cada documento
        _id: 0,
        id: '$id',
        title: 1,
        author: 1,
        date: { $dateToString: { date: '$date', format: '%d-%m-%Y', } }, // Si la fecha esta almacenada en formato Date
        // date: { $dateFromString: { dateString: '$date', format: '%d-%m-%Y' } }, Si la fecha esta almacenada en formato String
        comments: { $size: '$comments' }
      }
    }
  ]);

  const role = getRole(req);

  res.render('adminArticulos', {
    session: role.user,
    json: template
  });
};
*/