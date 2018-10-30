const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    dateCreated: { type: Date, default: Date.now() },
    imgUrl: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User' },
    category: String,
    ingredients: [ String ],
    directions: [ String ],
    level: String,
    prepTime: Number,
    likes: Number,
    comments: { type: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ], default: [] },
})

module.exports = mongoose.model('Post', postSchema)