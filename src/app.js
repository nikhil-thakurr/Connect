const express =require("express")
const connectDB=require("./config/database")
const app =express();
const User = require("./models/user")


app.post("/post",async (req,res)=>{
    const user = new User({
        firstName:"Nikhil",
        lastName :"Thakur",
        emailId :"nikhil@gmail.com",
        password:"nikhil"

    })

    try{

        await user.save();

        res.send("User Added succesfully");
    }
    catch(err){

        res.status(400).send("error saving the user :" + err.message);

    }
})

connectDB().then (()=>{
    console.log("connection SuccessFull ...")

app.listen(3000,()=>{
    console.log("Server is running successfully")
});

})
.catch((err)=>{
    console.log("connection Unsuccessfull ...")
})
