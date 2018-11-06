const User = require('../models/user');
const formidable = require('formidable');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const config = require('../utlity/jwtConfig');
// const getUser = async (req, res) => {
//     try{
//         const user = await User.findById(req.params.id)
//         res.status(200).json(user);
//     }catch(err){
//         res.status(500).end(err.message)
//     }
// }
const registerUser = async (req, res) => {
    try{
        req.body.password = User.hashPassword(req.body.password);
        const user = await new User({ ...req.body })
            .save();
        const expiresIn = 1000 * 60 * 60//ms;
        const token = jwt.sign(user.toJSON(), config.secret);
        // TODO: refreshtokens
        res.status(200).json({user, token, refreshToken, expiresIn});
    }catch(err){
        console.log(err.message);
        res.status(500).end(err.message)
    }
}
const loginUser = async (req, res) => {
        passport.authenticate('local', {session: false}, (err, user, info) => {
            if (err || !user) {
                return res.status(400).json(info);
            }
            // TODO: refreshtokens
            req.login(user, {session: false}, (err) => {
                if (err) {
                    res.send(err);
                }
                const token = jwt.sign(user.toJSON(), config.secret);
                return res.json({user, token});
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
            //refresh token
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

module.exports = {
    // createUser,
    // getUser,
    loginUser,
    registerUser,
    editUser,
    deleteUser
}
