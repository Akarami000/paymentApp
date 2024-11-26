const config = require('config');
const jwt = require('jsonwebtoken');
const JWTToken = config.get('jwtSecret');

const authMiddleWare =(req,res,next)=>{
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({});
    }
    const token = authHeader.split(' ')[1];

    try{
        const decode = jwt.verify(token,JWTToken);
        req.userID = decode.user;
        console.log(decode,"vale 2");
        next();
    }
    catch(err){
        return res.status(403).json({});        
    }

}

module.exports = authMiddleWare;