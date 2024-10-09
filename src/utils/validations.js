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

const validationsEditData =(req)=>{
    const ALLOWED_EDITS =["photoUrl","about","gender","age","skills","firstName","lastName"];

    const isEditAllowed=Object.keys(req.body).every((field)=>ALLOWED_EDITS.includes(field));

    return isEditAllowed;

}

module.exports = {validationSignUpData,validationsEditData}