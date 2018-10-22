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
    avatarUrl: {type: String, default: 'http://chittagongit.com//images/chef-icon-png/chef-icon-png-6.jpg' },
    coverUrl: {type: String, default: 'https://www.sleekcover.com/covers/yummy-sweet-chocolates-facebook-cover.jpg' },
    following: { type: [ { type: Schema.Types.ObjectId, ref: 'User' } ], default: [] }
})

module.exports = mongoose.model('User', userSchema)