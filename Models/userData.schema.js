import mongoose, { version } from "mongoose";

const userSchema= mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"},
    
    workoutDetails:[{
      date:String, 
      body_weight:Number,
      parts:[{
        part:String,
        squat: String,
        sets: Number,
        reps: Number,
        weight:Number,
        time: Number,
        calories_burned:Number,
        _id:false
      }],
      
      _id:false
     
      
            
            }]
        

    
},{versionKey:false})
const userData=mongoose.model("userData",userSchema);
export default userData;