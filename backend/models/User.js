import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: String,
    image: {
        data: Buffer,
        contentType: String,
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
UserSchema.methods.isFollowedByUser = function (userId) {
    return this.followers.includes(userId);
};

export default mongoose.model('User', UserSchema);
