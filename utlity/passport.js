const User = require('../models/user')
const passport = require('passport');
const config = require('./config')

const LocalStrategy = require('passport-local').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy   = passportJWT.Strategy;

const localSecret = 'crna mamba'
exports.localSecret = localSecret;

passport.use(new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        (email, password, cb) => {
            return User.findOne({ email })
                .then(user => {
                    if (!user) {
                        return cb(null, null, { message: 'User does not exist' });
                    } else if (!User.comparePassword(password, user.password)) {
                        return cb(null, null, { message: 'Invalid password' });
                    } else {
                        return cb(null, user, { message: 'Logged In Successfully' });
                    }
                })
                .catch(err => cb(err, null, { message: err.message }));
        }
    ));

passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: localSecret
    },
    (jwtPayload, cb) => {
        return User.findOneById(jwtPayload.id)
            .then(user => {
                return cb(null, user);
            })
            .catch(err => {
                return cb(err);
            });
    }
));
passport.use(new FacebookTokenStrategy({
    clientID: config.facebook_app_id,
    clientSecret: config.facebook_app_secret,
  },
  async (accessToken, refreshToken, profile, cb) => {
    try{
        cb(null, profile, null)
    }catch(err){
        console.log(err.message)
        cb(err, null, null)
    }
  }
));
