const router = require('express').Router();
const followingController = require('../controllers/followingController');
const checkAuth = require('../utlity/checkAuth');

router.get('/:id', followingController.followingUsers)

router.post('/follow/:id', followingController.followUser);

router.post('/unfollow/:id', followingController.unfollowUser);


module.exports = router;
