
//Load env variables
if (process.env.NODE_ENV != "production"){

   require("dotenv").config()
}

const mongoose = require("mongoose")

const connectToDb = async ()=>{
   try {
    await mongoose.connect("mongodb+srv://Aun:aun123@cluster0.e7rpyta.mongodb.net/")
    console.log("Connected to Database");
   } catch (error) {
console.log(error);    
   }
}

module.exports = connectToDb