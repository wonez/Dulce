const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    description: String,
    prepTime: Number,
    ingredients: [ String ],
    directions: [ String ],
    level: String,
    category: String,
    imgUrl: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now() },
    likes: { type: Number, default: 0 },
    comments: { type: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ], default: [] },
})

module.exports = mongoose.model('Post', postSchema)