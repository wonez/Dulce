const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: String,
    dateCreated: { type: Date, default: Date.now() },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
})

module.exports = mongoose.model('Comment', commentSchema)