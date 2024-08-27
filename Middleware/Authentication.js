import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();





const Authentication=async(req,res,next)=>{
    try{
       // console.log(req.body.date);
        //console.log(req.headers.authorization)
        const token=req.headers.authorization?.split(' ')[1];
       // console.log(token)
        if(!token){
            return res.status(401).json({msg:"Token is missing"});
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        res.status(401).json({msg:"Token is not valid"});
    }
}

export default Authentication;  