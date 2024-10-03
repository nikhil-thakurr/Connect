const mongoose = require("mongoose");

const connectionRequestSchema = mongoose.Schema({

    fromUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type:String,
        enum:{
            value :["ignored","interested","accepted","rejected"],
            message:`{VALUE} is incorrect type`
        }
    }

},{timeStamps:true})

module.exports = mongoose.model("connectionRequest",connectionRequestSchema)