const router = require('express').Router();
const postController = require('../controllers/postController.js');
const checkAuth = require('../utlity/checkAuth');

router.post('/', checkAuth, postController.createPost);

router.get('/:uri', postController.getPost);

router.get('/user/:userId', postController.getUserPosts)

router.get('/', postController.getNewsFeed);

router.post('/comment/:postId', postController.postComment)

router.post('/like/:postId', postController.postLike)

router.put('/comment/:commentId', postController.editComment)

router.put('/:id', checkAuth, postController.editPost);

router.delete('/comment/:postId/:commentId', postController.deleteComment)

router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;