import express from "express";
import {addUser,loginUser,getUserByEmail} from '../controler/user.js'



const router = express.Router()

router.post('/',addUser);
router.post('/login',loginUser);
router.post('/email',getUserByEmail)

export default router;
