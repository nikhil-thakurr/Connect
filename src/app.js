const express =require("express")
const connectDB=require("./config/database")
const app =express();
const User = require("./models/user")
const cookieparser = require("cookie-parser")
const jwt = require("jsonwebtoken");
const cors = require("cors")

const corsOptions = {
    origin: "http://localhost:5173",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204
  };
  
  // Apply CORS to all routes
  app.use(cors(corsOptions));
  
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(cookieparser());


const authRouter =require("./routes/auth")
const profileRouter =require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter)
app.use("/",userRouter)




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
