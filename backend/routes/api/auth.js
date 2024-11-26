const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator')
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const config= require('config');
const JwTTOKEN = config.get('jwtSecret');
const jwtVerify = require('../../middleware/jwtVerify');

router.get('/user', jwtVerify, async (req, res) => {
    try {
      // Use `req.user` assuming it contains the user ID
      console.log('rq',req.user)
      const user = await User.findById(req.user).select('-password'); // select(-password) to exclude password and using findById to search user by _id
      res.json({ user }); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

router.post('/sign-in',[
check('email','Please include the email').isEmail(),
check('password', 'please enter the password with 6 or more characters').exists()]
,async(req,res)=>{
    const error = validationResult(req);
    if (!error.isEmpty()){
        return res.status(400).json({errors:error.array()});
    } 

    const {email,password} = req.body;
    try{
        var user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message:"Invalid Cred"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            return res.status(400).json({message:"Incorrect Password"});
        }
        const payload = {
            user:user._id,
        }
        jwt.sign(payload,JwTTOKEN,{expiresIn:3600},(err,token)=>{
            if(err)throw err;
            res.json({token});
        })
        
   }
    catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
})

module.exports = router;