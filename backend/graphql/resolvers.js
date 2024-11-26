const User = require('../models/User');

const resolver = {
    Query:{
        getUser:async(_,{id})=>await User.findById(id),
        getUser:async()=> await User.find()
    },Mutation:{
        createUser: async(_,{firstName,LastName,email})=>{
            const newUser = new User({firstName,lastName,email});
            return await newUser.save();
        }
    }
}

module.exports = resolver;