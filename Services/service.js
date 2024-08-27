import nodemailer from 'nodemailer';

const mail=(email)=>{

    let mailTransporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'ssubash042@gmail.com',
            pass:'udgr ldvp lcrz uoyt'
        }
    });
    
    let details={
        from:'ssubash042@gmail.com',
        to:`${email}`,
        subject:'password reset',
        text:`https://subashfsdfittrack.netlify.app/resetpassword/${email}`
    };
    
    mailTransporter.sendMail(details,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("Email sent")
        }
    });
    
    
}

export default mail;