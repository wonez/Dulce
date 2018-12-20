const User = require('../models/user');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../utlity/config');
const saveProfilePhoto = require('../utlity/saveProfilePhoto');

const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id, {
            password: 0,
            email: 0
        })
        res.status(200).json(user);
    }catch(err){
        res.status(500).end(err.message)
    }
}

const registerUser = async (req, res) => {
    try{
        req.body.password = User.hashPassword(req.body.password);
        const user = await new User({ ...req.body })
            .save();
        const expiresIn = 1000 * 60 * 60//1hour;
        const token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({user, token, expiresIn});
    } catch(err) {
        let msg = err.message;
        if(err.code === 11000){
            msg = 'User already exists'
        }
        res.status(500).json({message: msg})
    }
}

const loginUser = async (req, res) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json(info);
            }
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const expiresIn = 1000 * 60 * 60//1hour;
                const token = jwt.sign(user.toJSON(), config.secret);
                return res.status(200).json({user, token, expiresIn});
            });
        })(req, res);
}

const editUser = async (req, res) => {
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = 'public/images'
    form.keepExtensions = true;
    
    form.parse(req, async (err, fields, files) => {
        try{
            const updated = {...fields}
            if(updated.password){
                updated.password = User.hashPassword(updated.password)
            } else {
                delete updated.password;
            }
            if(files.avatarUrlFile){
                const paths = files.avatarUrlFile.path.split('/');
                paths[0] = 'http://localhost:8000/';
                updated.avatarUrl = paths.join('/');
            }
            if(files.coverUrlFile){
                const paths = files.coverUrlFile.path.split('/');
                paths[0] = 'http://localhost:8000/';
                updated.coverUrl = paths.join('/');
            }
            const user = await User.findOneAndUpdate({ _id: req.params.id },updated, {new: true})
            const token = jwt.sign(user.toJSON(), config.secret)
            res.status(200).json({user, token});
        } catch(err){
            res.status(500).end(err.message)
        }
    })
}

const deleteUser = async (req, res) => {
    try{
        await User.findOneAndDelete(req.params.id)
        res.status(200).end('User deleted');
    }catch(err){
        res.status(500).end(err.message)
    }
}

const facebookAuth = async (req, res) => {
    try{
        const accessToken = req.body.access_token;
        const userData = req.user._json;

        let user = await User.findOne({ 
            $or:[
                { fbId: userData.id },
                { email: userData.email }
            ]
        });
        if(!user){
            const imgUrl = await saveProfilePhoto(userData.id, accessToken);
            user = await new User({
                email: userData.email,
                fbId: userData.id,
                name: userData.first_name,
                surname: userData.last_name,
                avatarUrl: imgUrl
            }).save();
        }
        const expiresIn = 1000 * 60 * 60//1hour;
        const token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({user, token, expiresIn});
    }catch(err){
        console.log(err);
        res.status(500).end(err.message);
    }
}

const googleAuth = async (req, res) => {
    try{
        const userData = req.user._json;
        let user = await User.findOne({ 
            $or: [
                { googleId: userData.id },
                { email: userData.emails[0].value }
            ] 
        });
        if(!user){
            user = await new User({
                email: userData.emails[0].value,
                googleId: userData.id,
                name: userData.name.givenName,
                surname: userData.name.familyName,
                avatarUrl: [userData.image.url.split('sz')[0], 'sz=500'].join('')
            }).save();
        }
        const expiresIn = 1000 * 60 * 60//1hour;
        const token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({user, token, expiresIn});
    }catch(err){
        console.log(err);
        res.status(500).end(err.message);
    }
}

module.exports = {
    getUser,
    loginUser,
    registerUser,
    editUser,
    deleteUser,
    facebookAuth,
    googleAuth
}
