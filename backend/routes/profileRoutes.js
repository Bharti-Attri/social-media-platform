import express from 'express'
import { getMyProfile,getUserProfile,changePic,updateProfile,getUserInfo } from '../controllers/profileController.js';
import authorize from '../middleware/authorize.js';
import upload from '../middleware/upload.js';

const router = express.Router();
router.post('/changePic',authorize(),upload.single('image'),(req,res)=>{
    const userId = req.user.id;
    const file = req.req;
    const { message,error } = changePic(userId,file)
    if(message){
        res.json({message});
    }
    else res.status(500).json({error});
});
router.post('/updateProfile',authorize(),upload.single('image'), updateProfile);
router.get('/MyProfile',authorize(), getMyProfile);
router.post('/userProfile',authorize(), getUserProfile);
router.get('/getUserInfo',authorize(), getUserInfo);

export default router;