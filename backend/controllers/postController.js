import Post from '../models/Post.js';
const createPost = async (req, res) => {
    const newPost = new Post({
        user: req.user.id,
        caption: req.body.text,
    });

    try {
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ error: 'Image file is required' });
        }


        newPost.image = {
            data: imageFile.buffer,
            contentType: imageFile.mimetype,
        };

        await newPost.save();

        res.json({ message: 'Post created successfully!' });

    } catch (error) {
        res.status(500).json({ error: 'Error creating post' });
    }
};



const getPosts = async (req, res) => {
    const { postId } = await req.query;
    let postsData;

    if (postId) {
        postsData = [await Post.findById(postId).populate('user')];
    } else {
        postsData = await Post.find().populate('user');
    }
    const postsWithImages = postsData?.map(postData => {
        const imageBase64 = postData.image.data.toString('base64');
        const imageUrl = `data:${postData.image.contentType};base64,${imageBase64}`;
        const picBase64 = postData.user.image.data.toString('base64');
        const userpic = `data:${postData.user.image.contentType};base64,${picBase64}`;
        const isLiked = postData.isLikedByUser(req.user.id);
        const isFollowed = postData.user.isFollowedByUser(req.user.id);
        if (postId || postData.user._id.toString() !== req.user.id) {
            return {
                postData,
                imageUrl,
                isLiked,
                isFollowed,
                userpic
            };
        }
    })
    res.json(postsWithImages);
};


export { createPost, getPosts };
