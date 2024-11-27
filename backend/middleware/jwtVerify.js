const jwt = require('jsonwebtoken');
const config = require('config');
const JWTToken = config.get('jwtSecret');

function jwtVerify(req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        return res.status(401).json({msg:'no token, Authorization denied'});
    }
    //verify token 
    try{
        const decode = jwt.verify(token,JWTToken);
        req.user = decode.user;
        next();
    }
    catch(err){
        console.error(err.message);
        res.status(401).json({msg:"token is not valid"});
    }
}

module.exports = jwtVerify;



