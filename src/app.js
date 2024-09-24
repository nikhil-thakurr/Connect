const express =require("express")
const connectDB=require("./config/database")
const app =express();
const User = require("./models/user")

app.use(express.json());


app.post("/signup",async (req,res)=>{
    // const user = new User({
    //     firstName:"Nikhil",
    //     lastName :"Thakur",
    //     emailId :"nikhil@gmail.com",
    //     password:"nikhil"

    // })

    const user =new User(req.body);

    try{

        await user.save();

        res.send("User Added succesfully");
    }
    catch(err){

        res.status(400).send("error saving the user :" + err.message);

    }
})

app.get("/user",async (req,res)=>{
    const userEmail =req.body.emailId;

    try{

        const user =await User.find({emailId:userEmail});
        if(user.length===0){
            res.status(404).send("User Not Found..");
        }
        else res.send(user);

    }
    catch(err){
        res.status(400).send("Something went wrong...");
    }

})

app.get("/feed",async (req,res)=>{
    const userEmail =req.body.emailId;

    try{

        const user =await User.find({});
        if(user.length===0){
            res.status(404).send("User Not Found..");
        }
        else res.send(user);

    }
    catch(err){
        res.status(400).send("Something went wrong...");
    }

})


app.delete("/user",async (req,res)=>{
    const userId =req.body.userId;

    try{
        // const user =await User.findByIdAndDelete({_id:userId});
        const user =await User.findByIdAndDelete(userId);
        
         res.send("User Deleted Succcesfully");

    }
    catch(err){
        res.status(400).send("Something went wrong...");
    }

})


app.patch("/user",async (req,res)=>{
    const userId =req.body.userId;
    const data = req.body;

    try{
        // const user =await User.findByIdAndDelete({_id:userId});
        const user =await User.findByIdAndUpdate({_id:userId},data);
        
         res.send("User Updated Succcesfully");

    }
    catch(err){
        res.status(400).send("Something went wrong...");
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
