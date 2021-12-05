const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../middlewares/auth");
const router = express.Router();
router.use(cookieParser())

/* inicio */
router.get("/admin",[verificaToken,verificaAdminRole], async(req, res) => {
  role= getRole(req);
  res.render("admin",
  {
    session: role.user,
    role: role.admin,
    admin: true,
    inicio: true
  });
});

/* articulos */
router.use(require("./dashboard/articulos"))


/* comentarios */
router.use(require("./dashboard/comentarios"))

/* usuarios */
router.get("/usuarios",[verificaToken,verificaAdminRole], async(req, res) => {
  role= getRole(req);
  res.render("adminUsuarios",
  {
    session: role.user,
    role: role.admin,
    admin: true,
    usuarios: true
  });
});
module.exports = router;
