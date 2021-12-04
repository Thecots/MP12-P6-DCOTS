const express = require("express");
const {verificaToken, verificaAdminRole} = require('./../middlewares/auth')
const cookieParser = require("cookie-parser");
const {getRole} = require("./../middlewares/auth");
const router = express.Router();
router.use(cookieParser())

router.get("/admin",[verificaToken,verificaAdminRole], async(req, res) => {
  role= getRole(req);
  res.render("admin",
  {
    session: role.user,
    role: role.admin,
    admin: true
  });
});

module.exports = router;
