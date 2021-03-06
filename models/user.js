const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const userSchema = new Schema({
    email: { type: String, unique: true }, 
    password: { type: String },
    fbId: { type: String },
    googleId: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    city: { type: String, default: '' },
    country: { type: String, default: ''},
    biography: { type: String, default: ''},
    avatarUrl: {type: String, default: 'https://firebasestorage.googleapis.com/v0/b/dulce-226122.appspot.com/o/avatar.jpg?alt=media&token=fe03a2b1-5857-46bb-9e8c-c560c1c78e1c' },
    coverUrl: {type: String, default: 'https://firebasestorage.googleapis.com/v0/b/dulce-226122.appspot.com/o/cover.jpeg?alt=media&token=eff9c77f-89cc-4659-ab68-fe56a8c10fe4' },
    following: { type: [ { type: Schema.Types.ObjectId, ref: 'User' } ], default: [] }
})

userSchema.plugin(URLSlugs('name surname', {field: 'uri'}));

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.statics.comparePassword = (guess, hash) => {
    return bcrypt.compareSync(guess, hash);
}

module.exports = mongoose.model('User', userSchema)