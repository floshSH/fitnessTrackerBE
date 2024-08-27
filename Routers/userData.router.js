import express from 'express';
import { createUserdata, getUserDataByDate, getUserTodayData } from '../Controllers/useData.controller.js';
import Authentication from '../Middleware/Authentication.js';

const router=express.Router();

router.post("/post",Authentication , createUserdata);
router.get("/getToday",Authentication, getUserTodayData);
router.put("/getByDate",Authentication, getUserDataByDate)

export default router; 

