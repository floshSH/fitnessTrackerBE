
import express from 'express';
import cors from 'cors';
import userRoutes from './Routers/user.router.js';
import useraDataRoutes from './Routers/userData.router.js';
import dotenv from 'dotenv';
import connectDB from './Database/dbConfig.js';
import issueRoutes from './Routers/issueData.router.js'

dotenv.config();

const app=express();
app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
    res.status(200).send("App is running")
})
app.use("/user", userRoutes);
app.use("/data", useraDataRoutes);
app.use("/issue", issueRoutes)
connectDB();


app.listen(process.env.port,()=>
    console.log(`App is running on port ${process.env.port}`)
)