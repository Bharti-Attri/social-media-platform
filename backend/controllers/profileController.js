import Post from '../models/Post.js';
import User from '../models/User.js';
const getUserInfo = async(req,res)=>{
    const user = await User.findById(req.user.id);
    const imageBase64 = user.image.data.toString('base64');
    const imageUrl = `data:${user.image.contentType};base64,${imageBase64}`;
    res.json({user,imageUrl});
}
const getMyProfile = async (req, res) => {
    const userData = await User.findById(req.user.id);
    let imageUrl;
    if (userData.image.data) {
        const imageBase64 = userData.image.data.toString('base64');
        imageUrl = `data:${userData.image.contentType};base64,${imageBase64}`;
    }
    const user = { userData, imageUrl }
    const postsData = await Post.find({ user: req.user.id });
    let posts = []
    postsData?.forEach(async postData => {
        const imageBase64 = postData.image.data.toString('base64');
        const imageUrl = `data:${postData.image.contentType};base64,${imageBase64}`;
        const post = { _id: postData._id, imageUrl }
        posts.push(post);
    });
    res.json({ posts, user });
}
const getUserProfile = async (req, res) => {
    const userData = await User.findById(req.body.userId);
    let imageUrl;
    if (userData.image.data) {
        const imageBase64 = userData.image.data.toString('base64');
        imageUrl = `data:${userData.image.contentType};base64,${imageBase64}`;
    }

    const user = { userData, imageUrl }
    const postsData = await Post.find({ user: req.body.userId });
    const isFollowed = userData.isFollowedByUser(req.user.id);
    let posts = []
    postsData?.forEach(async postData => {
        const imageBase64 = postData.image.data.toString('base64');
        const imageUrl = `data:${postData.image.contentType};base64,${imageBase64}`;
        const post = { _id: postData._id, imageUrl }
        posts.push(post);
    });
    res.json({ posts, user, isFollowed });
}

const changePic = async (userId,file) => {
    const user = await User.findById(userId);
    try {
        const imageFile = file;

        if (!imageFile) {
            return res.status(400).json({ error: 'Image file is required' });
        }
        user.image = {
            data: imageFile.buffer,
            contentType: imageFile.mimetype,
        };

        await user.save();

        return { message: 'Changed successfully!' };

    } catch (error) {
        console.error(error);
        return { error: 'Error in changing pic' };
    }
};

const updateProfile = async(req,res)=>{
    await changePic(req.user.id,req.file);
    const bio = req.body.text;
    const user = await User.findById(req.user.id);
    user.bio = bio;
    await user.save();
    res.json({message:'updated Successfully'})
}


export {getMyProfile,getUserProfile,changePic,updateProfile,getUserInfo}