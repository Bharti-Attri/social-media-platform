import User from '../models/User.js';
const addFollower = async (req, res) => {
    await User.updateOne(
        { _id: req.body.userId },
        { $addToSet: { followers: req.user.id } }
    );
    await User.updateOne(
        { _id: req.user.id },
        { $addToSet: { following: req.body.userId } }
    );
    res.json({
        message: 'success'
    })
}
const removeFollower = async (req, res) => {
    await User.updateOne(
        { _id: req.body.userId },
        { $pull: { followers: req.user.id } }
    );
    await User.updateOne(
        { _id: req.user.id },
        { $pull: { following: req.body.userId} }
    );
    res.json({
        message: 'success'
    })
}


export {addFollower,removeFollower}