const express = require('express');
const passport = require('passport');
var router = express.Router();

/* router */

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/signIn', (req, res) => {
    res.render('signIn');
});

router.get('/auth/facebook', passport.authenticate('facebook', {
    authType: 'rerequest',
    scope: ['public_profile', 'email']
}));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});

router.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/');
});
module.exports = router;