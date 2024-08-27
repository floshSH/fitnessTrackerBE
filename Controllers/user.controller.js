
import users from "../Models/user.schema.js";
import bcrypt from "bcrypt";
import mail from '../Services/service.js'
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';


dotenv.config();

export const userRegister=async(req,res)=>{
    try {
        const {username,email,password}=req.body;
        const hashPassword= await bcrypt.hash(password,10);
        //console.log(hashPassword);
        const newUser=new users({
            username,
            email,
            password:hashPassword
        });
        const user= await users.findOne({email});
        const user1=await users.findOne({username});
        //console.log(user);
        //console.log(user1);
        if(user){
            return res.status(201).json({message:"Email Already Exists"});
        }
        else if(user1){
            return res.status(201).json({message:"Username Already Exists"});
        }
       
        else{
           
        await newUser.save();
        res.status(200).json({message:"User registered successfully"});
        }
    } catch (error) {
        console.log(error);
    } {
        
    }
}



export const userLogin= async(req,res)=>{
    try{
        const {email, password}=req.body;
        const user= await users.findOne({email});
        if(!user){
            return res.status(201).json({message:"Email not found"});
        }
        const isPasswordValid= await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            mail(email);
           
            return res.status(201).json({message:"Invalid password! password reset mail sent!!"});
        }
        
        const token= jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"1h"})
        user.token=token;
        await user.save();

        res.status(200).json({message:"Login successful", token:token});
    }
    catch(error){
        console.log(error);
    }
}


export const checkUserExists= async(req, res)=>{
    try{
        const {email}=req.body;
        //console.log(email);
        const user= await users.findOne({email});
        if(user){
            mail(email);
            //redirect(`http://localhost:5173/resetpassword/${email}`);
            return res.status(200).json({message:"Email found"});
        }
        else{
            return res.status(201).json({message:"Email not found"});
        }
    }
    catch(error){
        console.log(error);
    }
}

export const resetPassword= async(req, res)=>{
    try{
       
        const {email, password}=req.body;
        const user= await users.findOne({email});
       
        if(!user){
            return res.status(401).json({message:"Email not found"});
        }
        user.password= await bcrypt.hash(password,10);
        
        
       // console.log(user.id);
       
        const updateUser=await users.findByIdAndUpdate(user.id,user, {new:true});
       // console.log(updateUser)
        res.status(200).json({message:"Password Changed successful"});
    }
    catch(error){
        console.log(error);
    }
}


// find user already exists or not
export const findUser= async(req, res)=>{
    try{
        const {email}=req.body;
        const user= await users.findOne({email});
        if(user){
            return res.status(200).json({message:"Email found"});
        }
        else{
            return res.status(200).json({message:"Email not found"});
        }
    }
    catch(error){
        console.log(error);
    }
}



export const getProfile=async (req, res)=>{
    const user=await users.findOne({_id:req.user._id});
    res.status(200).json({user});
}