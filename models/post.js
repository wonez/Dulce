const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: String,
    dateCreated: { type: Date, default: Date.now() },
    imgUrl: String,
    authorId: {type: Schema.Types.ObjectId, ref: 'User' },
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    ingredients: [ String ],
    directions: [ String ],
    level: String,
    prepTime: Number,
    likes: Number,
    comments: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ]
})

module.exports = mongoose.model('Post', postSchema)