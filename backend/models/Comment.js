import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    content: String,
},{ timestamps: true });

export default mongoose.model('Comment', CommentSchema);
