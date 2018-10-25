const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, unique: true, required: true }, 
    password: { type: String, required: true },
    dateCreated: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: String,
    country: String,
    biography: String,
    avatarUrl: {type: String, default: 'http://deafhhcenter.org/wp-content/uploads/2017/12/profile-default.jpg' },
    coverUrl: {type: String, default: 'https://images.unsplash.com/photo-1505394033641-40c6ad1178d7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=2ce08c47852fb7cceac5e1e0fa88f404&auto=format&fit=crop&w=1012&q=80' },
    following: { type: [ { type: Schema.Types.ObjectId, ref: 'User' } ], default: [] }
})

module.exports = mongoose.model('User', userSchema)