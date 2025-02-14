import Post from '../models/Post.js';
const addLike = async (req, res) => {
    await Post.updateOne(
        { _id: req.body.postId },
        { $addToSet: { likes: req.user.id } }
    );
    res.json({
        message: 'success'
    })
}
const removeLike = async (req, res) => {

    await Post.updateOne(
        { _id: req.body.postId },
        { $pull: { likes: req.user.id } }
      );
    res.json({
        message: 'success'
    })
}
export {addLike,removeLike}