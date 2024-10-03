const express = require("require");
const userAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");

const requestRouter = express.Router();


requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{

    try{

        const fromUserId = req.user._id;
        const toUserId   = req.params.toUserId;
        const status    =req.params.status

        const connection = new connectionRequest({
            fromUserId,
            toUserId,
            status
        })

        const data = await connectionRequest.save();

        res.json({
            message:"Request Sent !!!",
            data
        })

    }
    catch(err){
        res.status(400).send("ERROR : ",err.message)
    }

})

module.exports = requestRouter