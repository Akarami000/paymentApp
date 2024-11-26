const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
const userSchema =  new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

//method to hash password
// userSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//         const salt = await bcrypt.genSalt(10);
//         this.password = await bcrypt.hash(this.password,salt);
//         console.log('pre hashing working ...')
//     }
//     next()
// })
// // Method to compare entered password with hashed password
// userSchema.method.comparePassword = async function(enteredPassword){
//     return await bcrypt.compare(enteredPassword,this.password);
// }


module.exports = User = mongoose.model('User',userSchema);
