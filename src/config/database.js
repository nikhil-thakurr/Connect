const mongoose = require("mongoose");


const connectDB = async()=>{
   await mongoose.connect("mongodb+srv://nt34542:nikhil@connect.m4hlb.mongodb.net/")
}

module.exports = connectDB

