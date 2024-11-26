const express = require('express');
const router = express.Router();
const {check,validationResult} = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const User = require('../../models/User');
const config = require('config');
const JwTTOKEN = config.get('jwtSecret');
const Account = require('../../models/Account');

router.post('/sign-up',[
check('firstName', 'Name is required').not().isEmpty(),
check('lastName', 'Name is required').not().isEmpty(),
check('email','Please include the email').isEmail(),
check('password', 'please enter the password with 6 or more characters').isStrongPassword()
],async(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const{firstName,lastName,email,password} = req.body;
    try{

        let user = await User.findOne({email});


        if(user){
            res.status(400).json({errors:'user already exists'});
        }
        else{
             const salt = await bcrypt.genSalt(10);
             const hashedPassword = await bcrypt.hash(password,salt);
            user = new User({
                firstName,    
                lastName,
                email,
                password : hashedPassword //use hashed password 
            })

            await user.save();
            // return JSON webtoken
           
            const payload = {
                user:user._id,
            }

            Account.create({
                userId:user._id,
                balance: 1 + Math.random()*10000
            })
           jwt.sign(payload,JwTTOKEN, 
            {expiresIn:360000}, 
            (err,token)=>{
                if(err) throw err;
              
                res.status(201).json({ msg: 'User registered successfully',token });
            })

        }


    }
    catch(err){
        console.error(err.message);
        return res.status(500).send('server error');
    }
}) 



module.exports = router;


