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


app.patch("/user/:userId",async (req,res)=>{
    const userId =req.params?.userId;
    const data = req.body;


    try{
        const ALLOWED_UPDATES =["photoUrl","about","gender","age","skills"];

        const isUpdateAllowed = Object.keys(data).every((k)=>
        ALLOWED_UPDATES.includes(k));

        if(!isUpdateAllowed){
            throw new Error("Update Not Allowed" );
        }

        if(data.skills.length>10){
            throw new Error("Cannot add more than 10 skills");
        }

        // const user =await User.findByIdAndDelete({_id:userId});
        const user =await User.findByIdAndUpdate({_id:userId},data,{
            runValidators:true
        });
        
         res.send("User Updated Succcesfully");

    }
    catch(err){
        res.status(400).send("Something went wrong..." +err.message);
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
