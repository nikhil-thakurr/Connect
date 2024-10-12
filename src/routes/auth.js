const express = require("express")
const {validationSignUpData} = require("../utils/validations")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user")
const userAuth = require("../middlewares/auth")

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
    // const user = new User({
    //     firstName:"Nikhil",
    //     lastName :"Thakur",
    //     emailId :"nikhil@gmail.com",
    //     password:"nikhil"

    // })

    try{

        //validate the data
        validationSignUpData(req);

    const {firstName,lastName,password,emailId}=req.body;

    const hashPassword = await bcrypt.hash(password,10);


    const user =new User({
        firstName,
        lastName,
        emailId,
        password:hashPassword,

    });
       const newUser= await user.save();

        const token =await newUser.getJWT(); 
        console.log(token);
        res.cookie("token",token,{expires:new Date(Date.now()+8*9000000)})

        res.json({message:"User Added succesfully",data:newUser});
    }
    catch(err){

        res.status(400).send("ERROR : " + err.message);

    }
})

authRouter.post("/login",async(req,res)=>{
    try{
        
        const {emailId,password}=req.body;

        const user = await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("User Doesnot exist");
        }

        const isValid = await user.checkPassword(password);
        if(!isValid){  
            throw new Error("Password is incorrect");

        }
        const token =await user.getJWT(); 
        console.log(token);
        res.cookie("token",token,{expires:new Date(Date.now()+8*9000000)})
        res.send(user)

    }
    catch(err){

        res.status(400).send("ERROR : " + err.message);

    }
})

authRouter.post ("/logout",(req,res)=>{
    res.cookie("token",null,{
        expires:new Date (Date.now())
    });
    res.send("user logged out succesfully")
})


module.exports =authRouter