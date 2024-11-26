const express = require('express');
const router = express.Router();
const User = require('../../models/User');


//get userId based on firstName and lastName
router.get('/find-user',async(req,res)=>{
    const filter = req.query.filter || "";
    try{
        const users = await User.find({
            $or:[{

                firstName:{
                    "$regex":filter, "$options":"i"
                }
            },{
                lastName:{
                    "$regex":filter,"$options":"i"
                }
            }]
        })

        res.json({
            user: users.map(user => ({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                _id: user._id
            }))
        })
        
    }

    catch(err){
        console.error(err);
        res.status(500).send('server error');
    }

})

module.exports = router;