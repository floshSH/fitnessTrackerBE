import issueData from "../Models/userIssue.schema.js";


export const addIsuues= async(req, res)=>{
    const user_id=req.user._id;
    const {issueType, issueDetails}= req.body.formData;

    const newIssue=new issueData({
        user_id,
        issueType,
         issueDetails

    });
    await newIssue.save();
    res.status(200).json({message:"issue Received Successfully"})
}