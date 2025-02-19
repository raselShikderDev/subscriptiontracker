import mongoose from "mongoose";
const usernameRegex = /^(?!_)(?!.*__)[A-Za-z0-9_]{3,15}(?<!_)$/;
const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/;

const user = mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        trim:true,
        minLength:[3, "Name must be atleast 3 character"],
        maxLength:[20, "Name contain no more than 20 character"],
    },
    username:{
        type:String,
        required:[true, "Please enter your username"],
        lowercase:true,
        unique:true,
        trim:true,
        match:usernameRegex
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        match:passwordRegex,
    },

    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        trim:true,
        match:emailRegex,
    },
}, {Timestamp:true})

const UserSchema = mongoose.model("UserSchema", user)
export default UserSchema