const passport = require('passport');
const LocalStrategy = require('passport-local');
const FacebookStrategy = require('passport-facebook');
const GoogleStrategy = require('passport-google-oauth');
const Users = require('../user');
const keys = require('./keys.json');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser((user, done) => {
        Users.findById(id, (err, user) => {
            done(null, user);
        });
    });

    passport.use(new GoogleStrategy({
        clientID: keys.google.clientID,
        clientSeceret: keys.google.clientSeceret,
        callbackURL: "http://localhost/auth/google/callback",
        passReqToCallback: true,
        scope: ['https://googleapis.com/auth/plus.me']
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(() => {
            user = profile;
            return done(null, user);
        });
    }));

    passport.use(new FacebookStrategy({
        clientId: keys.facebook.clientID,
        clientSeceret: keys.facebook.clientSeceret,
        callbackURL: 'http://localhost/auth/facebook/callback',
        passReqToCallback: true,
    }, (req, accessToken, refreshToken, profile, done) => {
        Users.findOne({ id:profile.id }, (err, user) => {
            if (user) return done(err, user);
            const newUser = new Users({
                id: profile.id
            });
            newUser.save((user) => {
                return done(null, user);
            });
        });
    }));

    /* Local Passport */
    // passport.use(new LocalStrategy({
    //     usernameField: 'id',
    //     passwordField: 'pw',
    //     session: true,
    //     passReqToCallback: false, 
    // }, (id, password, done) => {
    //     Users.findOne({ id: id}, (findError, user) => {
    //         if (findError) return done(findError);
    //         if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다'});
    //         return user.comparePassword(password, (passError, isMatch) => {
    //             if (isMatch) return done(null, user);
    //             return done(null, false, { message: '비밀번호가 틀렸습니다 '});
    //         });
    //     });
    // }));
};