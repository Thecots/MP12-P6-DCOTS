const jwt = require('jsonwebtoken');
const decode = require('jsonwebtoken/decode');

let verificaToken2 = (req, res, next) => {
    let userToken = req.get("X-Access-Token");
    console.log(userToken);
    jwt.verify(userToken, process.env.SEED, (err, decoded) => {
        if(err){
            console.log('error');
            res.redirect('/')
        };
        req.usuari = decoded.usuari;
        next();
    })
};



module.exports= {
    verificaToken2,
}