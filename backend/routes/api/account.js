const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const jwtVerify = require('../../middleware/jwtVerify');
const User = require('../../models/User');
const Account = require('../../models/Account');
const {check,validationResult}= require('express-validator');
const bcrypt = require('bcryptjs');
const authMiddleWare = require('../../middleware/authMiddleware');
const mongoose = require('mongoose');


// get API to check the balance:
router.get("/balance", authMiddleWare, async (req, res) => {
    try {
      const account = await Account.findOne({userId:req.userID});
      if (!account) {
        return res.status(404).json({ msg: 'Account not found' });
      }
      res.json({
        balance: account.balance,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

// In the given code, startSession() and startTransaction() are part of MongoDB transactions.
// They are used to ensure that multiple database operations either all succeed or all fail, 
// maintaining atomicity. This is particularly useful in scenarios where consistency across 
//multiple documents or collections is required.
// post request for transfering the amount 
router.post('/transfer',authMiddleWare,async(req,res)=>{
try{//  startSession():
//	•	Begins a MongoDB session.
//	•	A session allows you to group multiple operations into a single transaction.
    const session = await mongoose.startSession() //** Sets the session. Useful for [transactions](/docs/transactions.html). */
//startTransaction():
//•	Starts a transaction within the session.
//•	A transaction ensures that all operations inside it are treated as a single unit. If any operation fails, all changes made during the transaction can be rolled back.
    session.startTransaction();
    const {amount,to}= req.body;
    //fetching the account within the transaction 
    const account = await Account.findOne({userId:req.userID}).session(session);
    if(!account || account.balance < amount){
        await session.abortTransaction();
        return res.status(400).json({
            message: "Insufficient balance"
        });
    }
    const toAccount = await Account.findOne({userId:to}).session(session);
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid Account"
        })
    }
    //perform the transfer
    await Account.updateOne({userId:req.userID},{$inc:{balance:-amount}}).session(session);
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session);

    //commit the transaction 
    await session.commitTransaction();
    res.json({
        message:"Transfer successful"
    })
}
catch(error){
    console.error(error.message);
    res.status(403).send('something went wrong')
}
});

module.exports = router;
