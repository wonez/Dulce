const router = require('express').Router();
const userController = require('../controllers/userController')
const checkAuth = require('../utlity/checkAuth');
const passport = require('passport');

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.post('/facebook', passport.authenticate('facebook-token', { session: false }), userController.facebookAuth)

router.post('/google', passport.authenticate('google-plus-token', { session: false }), userController.googleAuth)

router.get('/:id', userController.getUser);

router.put('/:id', checkAuth, userController.editUser);

module.exports = router;
