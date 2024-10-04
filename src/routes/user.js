const express= require("express");
const userAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const userRouter = express.Router();


userRouter.get("/user/requests/recieved",userAuth,async(req,res,next)=>{
    try{

        const loggedUser = req.user;

        const requests = await connectionRequest.find({
            toUserId : loggedUser._id,
            status:"interested"
        }).populate("fromUserId",["firstName","lastName","age","skills","gender","about"])

        res.json({
            message:"Data Fetched Successfully ",
            data:requests
        })
    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

userRouter.get("/user/connections",userAuth,async(req,res,next)=>{
    try{

        const loggedUser = req.user;

        const connections = await connectionRequest.find({
            $or:[
                {
                    toUserId:loggedUser._id,
                    status:"accepted"
                },
                {
                    fromUserId:loggedUser._id,
                    status:"accepted"
                }
            ]
        }).populate("toUserId",["firstName","lastName","age","skills","gender","about"]).populate("fromUserId",["firstName","lastName","age","skills","gender","about"]);

        const data = connections.map((row)=>{
            if(row.fromUserId._id.toString()===loggedUser._id.toString()){
                return row.toUserId;
            }
            return row.fromUserId;
        })

        res.json({data})

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }
})

module.exports =  userRouter