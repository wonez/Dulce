const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    coverUrl: {type: String, default: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?ixlib=rb-0.3.5&s=0e0238ba247e437bad05f31a562bbb44&auto=format&fit=crop&w=1350&q=80' },
    following: { type: [ { type: Schema.Types.ObjectId, ref: 'User' } ], default: [] }
})

userSchema.statics.hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
}

userSchema.statics.comparePassword = (guess, hash) => {
    return bcrypt.compareSync(guess, hash);
}

module.exports = mongoose.model('User', userSchema)