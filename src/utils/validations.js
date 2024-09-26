
const validator=require("validator")

const validationSignUpData =(req)=>{
    const {firstName,lastName,password,emailId}=req.body;

    if(!firstName || !lastName){
        throw new Error ("Name is not valid !!!!");
    }
    if(!validator.isEmail(emailId)){
        throw new Error("Email Id is not valid  " );
    }
    if(!validator.isStrongPassword(password)){
        throw new Error("Password is not strong " );
    }

}

module.exports = validationSignUpData