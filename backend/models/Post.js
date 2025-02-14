import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    caption: String,
    image: {
        data: Buffer,
        contentType: String,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
}, { timestamps: true });

PostSchema.methods.isLikedByUser = function (userId) {
    return this.likes.includes(userId);
};
export default mongoose.model('Post', PostSchema);
