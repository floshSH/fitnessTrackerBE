import mongoose from 'mongoose';

const issueSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    issueType:String,
    issueDetails:String
},{versionKey:false})


const issueData=mongoose.model('issueData', issueSchema);
export default issueData;