const jwt = require('jsonwebtoken')
const config = require('./jwtConfig');

module.exports = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers.authorization || req.headers['x-access-token'];
    if(token){
        token = token.split('Bearer ')[1]
    }
    jwt.verify(token, config.secret, (err, user) => {
        if(user){
            req.user = user;
        }
        next();
    })
}