const express = require("express");
const userAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user")
const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{

        const fromUserId = req.user._id;
        const toUserId   = req.params.toUserId;
        const status    =req.params.status

        const ALLOWED_STATUS = ["ignored","interested"];

        if(!ALLOWED_STATUS.includes(status)){
            return res.status(400).json({
                message : "Invalid Status : " + status
            })
        }

        const isConnectionRequestValid = await connectionRequest.findOne({

            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId}
            ]

        })

        if(isConnectionRequestValid){
            return res.status(400).json({
                message : "Connection Request Already Exists"
            })
        }

        const user =await User.findById(toUserId);

        if(!user){
           return res.status(400).json({
                message:"User Not Found"
            })
        }

        const connection = new connectionRequest({
            fromUserId,
            toUserId,
            status
        })

        
        const data = await connection.save();
        console.log("hey")

        res.json({
            message:"Request Sent !!!",
            data,
        })

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message)
    }

})

module.exports = requestRouter