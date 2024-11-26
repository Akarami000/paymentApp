const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    userId: 
    {
        type:mongoose.Schema.Types.ObjectId, // Here im referencing to User modal 
        ref:'User',
        required:true,trim:true},
	balance: {type:Number,required:true,trim:true}

});

module.exports = Account = mongoose.model('Account',AccountSchema)
