const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI')
//Set NODE_ENV to production before running your app.
//---------------export NODE_ENV=production------------
const connectDB = async ()=>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 10000 // Adjust timeout as needed
        })
             console.log("mongoDB Connected ...")

    }
    catch(err){
        
        console.log("errorName:-",err.message);
        //exit process with fail 
        process.exit(1);
    }

}

module.exports  = connectDB;