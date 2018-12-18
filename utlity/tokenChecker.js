const jwt = require('jsonwebtoken')
const config = require('./config');
const User = require('../models/user');

module.exports = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers.authorization || req.headers['x-access-token'];
    if(token){
        token = token.split('Bearer ')[1]
    }
    jwt.verify(token, config.secret, async (err, user) => {
        if(user){
            try{
                const updatedUser = await User.findById(user._id, {password: 0, email: 0});
                req.user = updatedUser;
                next();
            }catch(err){
                console.log(err);
                res.status(500).json({message: err.message})
            }
        }else{
            next();
        }
    })
}