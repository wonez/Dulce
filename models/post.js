const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const postSchema = new Schema({
    title: String,
    description: String,
    prepTime: Number,
    ingredients: [ String ],
    directions: [ String ],
    level: String,
    category: {type: Schema.Types.ObjectId, ref: 'Category'},
    imgUrl: String,
    author: {type: Schema.Types.ObjectId, ref: 'User' },
    dateCreated: { type: Date, default: Date.now() },
    likes: { type: [ { type: Schema.Types.ObjectId, ref: 'User' } ], default: [] },
    comments: { type: [ { type: Schema.Types.ObjectId, ref: 'Comment' } ], default: [] },
})

postSchema.plugin(URLSlugs('title', {field: 'uri'}));

module.exports = mongoose.model('Post', postSchema)