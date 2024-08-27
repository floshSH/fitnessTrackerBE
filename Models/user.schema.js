import mongoose, { version } from "mongoose";


const userSchema=mongoose.Schema({
    username:String,
    email:String,
    password:String
},{versionKey:false})

const users=mongoose.model("users",userSchema);
export default users;