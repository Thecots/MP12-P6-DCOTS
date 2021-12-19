const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

/* Verifica que está logeado */
let verificaToken = (req, res, next) => {
    jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
        if(err){
            return res.redirect("/");
        };
        req.usuari = decoded.usuari;
        next();
    })
};

/* Verifica que és administrador */
let verificaAdminRole=(req,res,next) => {
    let usuari = req.usuari;
    if(usuari.role !== "ADMIN_ROLE"){
        return res.redirect("/")
    }
    next();
}

/* Verifica que no está logeado */
let verificaTokenLogin = (req, res, next) => {
    jwt.verify(req.cookies.session, process.env.SEED, (err, decoded) => {
        if(err){
            return next();
        };
        res.redirect("/");
    })
};

/* get role */
let getRole = (req) => {
    try {
        if(decode(req.cookies.session)['usuari']['role'] === "ADMIN_ROLE"){
            return {user: true, admin: true};
        }else{
            return {user: true, admin: false};
        }
    } catch (error) {
        return {user: false, admin: false};
    }
}

let getname = (req)=>{
    return decode(req.cookies.session)['usuari']['username'];
}


module.exports= {
    verificaToken,
    verificaAdminRole,
    verificaTokenLogin,
    getRole,
    getname
}