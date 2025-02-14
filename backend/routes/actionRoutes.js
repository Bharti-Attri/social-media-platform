import { addLike,removeLike } from '../utils/likeUtil.js';
import { addFollower,removeFollower } from '../utils/followUtil.js';
import authorize from '../middleware/authorize.js';
import express from 'express'
const router = express.Router();

router.post('/like',authorize(), addLike);
router.post('/unlike',authorize(), removeLike);
router.post('/follow',authorize(), addFollower);
router.post('/unfollow',authorize(), removeFollower);
export default router;
