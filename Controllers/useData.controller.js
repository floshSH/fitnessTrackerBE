import userData from "../Models/userData.schema.js";
import fs from 'fs';
import  {format, addDays}  from 'date-fns';


export const createUserdata= async(req, res)=>{
  const user_id=req.user._id;
  let flag=0;
    const { part,body_weight, squat, sets, reps, weight, time}=req.body.formData;
    const date= format(new Date(), 'yyyy-MM-dd');
    
  const partsMET=[{Back:5.5}, {Shoulder:5}, {ABS:4.3},{Legs:4}, {Chest:4.5}, {Full_Body:8}];
  let MET=0;
  
    partsMET.forEach((val, ind)=>{
      if(val[part]){
        MET=val[part];
      }
    })

  
  const calories_burned= (time* MET*3.5*body_weight/200);
    const alreadyexists=await userData.findOne({user_id})
      
   if(!alreadyexists){
    const newdata= new userData({
        user_id,
        workoutDetails:[ {
            date,
            body_weight,
             parts: [{
                part,
                squat,
                sets,
                reps,
                weight,
                time,
                calories_burned
            }]
        }
    ]
     });
    
             await newdata.save();
        res.status(200).json({partExcercise:newdata.workoutDetails.parts});
    }
    else{
      //console.log("upate")
      alreadyexists.workoutDetails.map((val,ind)=>{
        if(val.date===date){
          flag=1;
          let anotherflag=false;
          val.parts.forEach((partThere, ind)=>{
               // console.log(partThere.part, part)
            if( anotherflag=partThere.part===part){
              anotherflag=true;

              partThere.squat=squat;
              partThere.sets=parseInt(partThere.sets, 10) + parseInt(sets, 10);
              partThere.reps=parseInt(partThere.reps, 10) + parseInt(reps, 10);
              partThere.weight=parseInt(partThere.weight, 10) + parseInt(weight, 10);
              partThere.time=parseInt(partThere.time, 10) + parseInt(time, 10);
              partThere.calories_burned=parseInt(partThere.calories_burned, 10) + parseInt(calories_burned, 10);;
  
            }

          })
           
          
          
          if(!anotherflag){
            val.parts.push({
              part,
              squat,
              sets,
              reps,
              weight,
              time,
              calories_burned
            })
          }
        }
      })
      if(flag===0){
        alreadyexists.workoutDetails.push({
            date,
            body_weight,
             parts: [{
                part,
                squat,
                sets,
                reps,
                weight,
                time,
                calories_burned
            }]
        })
      }
      //console.log(alreadyexists.id);
      const updateresult= await userData.findByIdAndUpdate(alreadyexists.id,alreadyexists, {new:true});
      let dataObj;
      alreadyexists.workoutDetails.map((val,ind)=>{
        if(val.date===date){
          dataObj=val.parts 
        }})
       // console.log(dataObj);
      res.status(200).json({partExcercise:dataObj});
    }
    
}

//get today date




export const getUserTodayData=async(req, res)=>{
    const id=req.user._id;
     const todayDate= format(new Date(), 'yyyy-MM-dd');

        // console.log(todayDate);
    const dateExcercise=await userData.findOne({user_id:id});
     const now =new Date(todayDate);
     let  WeekCalorie=[], Calorie;
     let monthBack=0, monthShoulder=0, monthABS=0, monthLegs=0, monthChest=0, monthFull_Body=0 ;

     if(dateExcercise && dateExcercise.workoutDetails.length>0){
      const weekago = format(addDays(now, -7),'yyyy-MM-dd');
    
      dateExcercise.workoutDetails.map((val,index)=>{
        // console.log(val)
        // console.log( dayago) 
       
      let weekCaloriesPerDate=0;
        if(val.date > weekago){
            // console.log( WeekCalorie) 
            val.parts.forEach((partCal)=> weekCaloriesPerDate+=partCal.calories_burned)
          return   WeekCalorie.push([weekCaloriesPerDate, val.date])
        
       }
      })
      //console.log(dayago);
         
 


//for month


const monthago = format(addDays(now, -30),'yyyy-MM-dd');

dateExcercise.workoutDetails.map((val,index)=>{
  // console.log(val)
  // console.log( dayago) 
 

  if(val.date > monthago){
      // console.log( WeekCalorie)
      val.parts.forEach((partCal)=> {
        if(partCal.part==='Back') monthBack+=partCal.calories_burned;
        if(partCal.part==='Shoulder') monthShoulder+=partCal.calories_burned;
        if(partCal.part==='ABS') monthABS+=partCal.calories_burned;
        if(partCal.part==='Legs') monthLegs+=partCal.calories_burned;
        if(partCal.part==='Chest') monthChest+=partCal.calories_burned;
         if(partCal.part==='Full_Body') monthFull_Body+=partCal.calories_burned;
      }) 
 
 }
})
       
     }
    
    //console.log(dayago);
    let monthCalorieArray=[]  ;
monthCalorieArray.push({
    Back:monthBack,
    Shoulder:monthShoulder,
    ABS:monthABS,
    Legs:monthLegs,
    Chest:monthChest,
    Full_Body:monthFull_Body
})


     let partExcercise;
 if(dateExcercise && dateExcercise.workoutDetails.length>0){
  dateExcercise.workoutDetails.forEach((val,index)=>{

    if(val.date === todayDate){
        //console.log(val)
        return partExcercise=val.parts
   }
  })
  }
    const dataObj={partExcercise, WeekCalorie, monthCalorieArray}
//console.log(dataObj);
    

// dataObj.push(WeekCalorie);
// dataObj.push(partExcercise)
    res.status(200).json({data:dataObj});
 }







 export const getUserDataByDate=async(req, res)=>{
    const id=req.user._id;
    //console.log(req.user);
    //console.log(req.body.date);
    const date=format(new Date(req.body.date), 'yyyy-MM-dd');
    //console.log(date);
   
    const dateExcercise=await userData.findOne({user_id:id});
    if(dateExcercise){let partExcercise;
     
    dateExcercise.workoutDetails.forEach((val, index)=>{
     
       if(val.date === date){
        
           //console.log(val)
           return partExcercise=val.parts
      }
     })
    res.status(200).json({partExcercise});}
    else{
        res.status(404).json({message:"No data found", partExcercise:[]});
    }
 }