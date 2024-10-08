const jwt = require ("jsonwebtoken");
const user = require("../models/user");



const userAuth =async(req,res,next)=>{

    try{
        const {token} =req.cookies;
        if(!token){
            return res.status(401).send("User not authenticated")
        }

        const decodedMessage = await jwt.verify(token,"connect@123");

        const {_id} =decodedMessage;

        const User = await user.findById(_id);

        if(!User){
            throw new Error ("User Not Found");

        }

        req.user = User;
        next();

    }
    catch(err){
        res.status(400).send("ERROR : " + err.message);
    }

}


module.exports = userAuth