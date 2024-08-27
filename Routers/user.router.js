import express from 'express';
import { checkUserExists, resetPassword, userLogin, userRegister, getProfile } from '../Controllers/user.controller.js';
import Authentication from '../Middleware/Authentication.js';

const router=express.Router();


router.post('/register', userRegister)

router.post('/login',userLogin)
router.post('/checkUser', checkUserExists);
router.get('/getprofile',Authentication , getProfile)

router.put("/resetPassword",resetPassword)

export default router;