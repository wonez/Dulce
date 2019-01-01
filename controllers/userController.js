const User = require('../models/user');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../utlity/config');
const saveProfilePhoto = require('../utlity/saveProfilePhoto');
const fs = require('fs');

const getUserById = async (req, res) => {
    try{
        const user = await User.findById(req.params.id, {
            password: 0,
            email: 0
        })
        if(!user){
            throw {message: 'User does not exist'}
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).end(err.message)
    }
}
const getUserByUri = async (req, res) => {
    try{
        const user = await User.findOne({uri: req.params.uri}, {
            password: 0,
            email: 0
        })
        if(!user){
            throw {message: 'User does not exist'}
        }
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
        const token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({user, token});
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
                const retUser = {
                    _id: user._id,
                    email: user.email,
                    dateCreated: user.dateCreated,
                    name: user.name,
                    surname: user.surname,
                    city: user.city,
                    country: user.country,
                    biography: user.biography,
                    avatarUrl: user.avatarUrl,
                    coverUrl: user.coverUrl,
                    following: user.following,
                    uri: user.uri
                }
                const token = jwt.sign(JSON.stringify(retUser), config.secret);
                return res.status(200).json({user: retUser, token});
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
            const userCurrent = await User.findById(req.params.id);
            const updated = {...fields}
            if(updated.password){
                updated.password = User.hashPassword(updated.password)
            } else {
                delete updated.password;
            }
            if(files.avatarUrlFile){
                const paths = files.avatarUrlFile.path.split('/');
                paths[0] = ''
                updated.avatarUrl = paths.join('/');
                //delete old avatar
                const index = userCurrent.avatarUrl.indexOf('upload_');
                if(index != -1){
                    const path = `public/images/${userCurrent.avatarUrl.substring(index)}`
                    fs.unlinkSync(path)
                }
            }
            if(files.coverUrlFile){
                const paths = files.coverUrlFile.path.split('/');
                paths[0] = ''
                updated.coverUrl = paths.join('/');
                //delete old cover
                const index = userCurrent.coverUrl.indexOf('upload_');
                if(index != -1){
                    const path = `public/images/${userCurrent.coverUrl.substring(index)}`
                    fs.unlinkSync(path)
                }
            }
            const user = await User.findOneAndUpdate({ _id: req.params.id },updated, {new: true})
            const token = jwt.sign(user.toJSON(), config.secret)
            res.status(200).json({user, token});
        } catch(err){
            console.log(err.message)
            res.status(500).end(err.message)
        }
    })
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
        const token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({user, token });
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
        const token = jwt.sign(user.toJSON(), config.secret);
        res.status(200).json({user, token});
    }catch(err){
        console.log(err);
        res.status(500).end(err.message);
    }
}

module.exports = {
    getUserByUri,
    getUserById,
    loginUser,
    registerUser,
    editUser,
    facebookAuth,
    googleAuth
}
