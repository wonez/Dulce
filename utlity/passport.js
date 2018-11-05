const User = require('../models/user')
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
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