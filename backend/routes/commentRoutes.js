import express from 'express';
import Comment from '../models/Comment.js';
import authorize from '../middleware/authorize.js';

const router = express.Router();
router.get('/getcomments',async(req,res)=>{
    const {postId} = req.query;
    const commentsData = await Comment.find({post:postId}).populate('user');
    const comments=commentsData.map(commentData=>{
        const imageBase64 = commentData.user.image.data.toString('base64');
        const imageUrl = `data:${commentData.user.image.contentType};base64,${imageBase64}`;
        return {
            commentData,
            imageUrl
        }
    })
    res.json(comments);
})
router.post('/save',authorize(),async(req,res)=>{
    const { postId, comment } = await req.body;
    const newcomment = new Comment({
        user : req.user.id,
        post : postId,
        content : comment
    })
    await newcomment.save();
    res.json({message : 'comment saved'})
})

export default router;