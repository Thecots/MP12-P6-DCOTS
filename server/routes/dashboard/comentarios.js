const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../../middlewares/auth");
const Article = require("../../models/article");
const router = express.Router();
router.use(cookieParser())

router.get("/comentarios",[verificaToken,verificaAdminRole], async(req, res) => {
    role= getRole(req);
    res.render("adminComentarios",
    {
      session: role.user,
      role: role.admin,
      admin: true,
      comentarios: true
    });
  });

module.exports = router;