import express from 'express'
import { createPost, getPosts } from '../controllers/postController.js';
import authorize from '../middleware/authorize.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/create',authorize(),upload.single('image'), createPost);
router.get('/',authorize(), getPosts);

export default router;
