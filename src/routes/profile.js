const express= require("express");
const userAuth = require("../middlewares/auth")
const {validationsEditData} =require("../utils/validations")
const user = require("../models/user")

const profileRouter = express.Router();

profileRouter.get("/profile/view",userAuth,async(req,res)=>{

    try{
        const user = req.user;
        res.send(user)
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
}) 

profileRouter.patch("/profile/edit",userAuth ,async (req,res)=>{
    try{
        if(!validationsEditData){
            throw new Error("Invalid Request");
        }

        const loggedUser= req.user;
        const user =await user.findByIdAndUpdate({_id:userId},loggedUser,{
            runValidators:true
        });
        
         res.send("User Updated Succcesfully");

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);

    }
})


module.exports = profileRouter