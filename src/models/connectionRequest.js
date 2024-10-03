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
            values :["ignored","interested","accepted","rejected"]
        }
    }

},{timeStamps:true})

connectionRequestSchema.pre("save",function(next){
    const connectionRequest =this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send request to yourself !!!")
    }
    next();
})

module.exports = mongoose.model("connectionRequest",connectionRequestSchema)