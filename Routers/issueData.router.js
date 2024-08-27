import express from 'express';
import { addIsuues } from '../Controllers/issueData.controller.js';
import Authentication from '../Middleware/Authentication.js';


const router=express.Router();

router.post("/postIssue",Authentication, addIsuues);
export default router;