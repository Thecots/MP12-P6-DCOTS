const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

var cookieParser = require('cookie-parser')

let verificaToken = (req, res, next) => {
    console.log(req.cookies.session);
    let userToken = req.cookies.session;


    jwt.verify(userToken, process.env.SEED, (err, decoded) => {
        if(err){
            return res.redirect("/");/* res.status(401).json({
                of:false,
                err:{
                    message: "Token no vàlid"
                }
            }); */
        };
        req.usuari = decoded.usuari;
        next();
    })
};

let verificaAdminRole=(req,res,next) => {
    let usuari = req.usuari;
    if(usuari.role !== "ADMIN_ROLE"){
        return res.redirect("/") /* res.status(401).json({
            ok:false,
            err:{
                message: "No autoritzat"
            }
        }) */
    }
    next();
}

module.exports= {
    verificaToken,
    verificaAdminRole
}