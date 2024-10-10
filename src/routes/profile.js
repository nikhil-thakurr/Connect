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
        if(!validationsEditData(req)){
            throw new Error("Invalid Request");
        }

        const loggedUser= req.user;
        // console.log(loggedUser)
        const updatedUser = await user.findByIdAndUpdate(
            { _id: loggedUser._id },
            req.body,
            { 
              runValidators: true,
              new: true  // This ensures that the updated document is returned
            }
          );        
         res.json({message:"User Updated Succcesfully",data:updatedUser});

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})


module.exports = profileRouter