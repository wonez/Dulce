const router = require('express').Router();
const postController = require('../controllers/postController.js');
const checkAuth = require('../utlity/checkAuth');

router.post('/', checkAuth, postController.createPost);

router.get('/:id', postController.getPost);

router.get('/user/:userId', postController.getUserPosts)

router.get('/', postController.getManyPosts);

router.post('/comment/:postId', postController.postComment)

//check that the post belongs to the editor
router.put('/:id', checkAuth, postController.editPost);

router.delete('/:id', checkAuth, postController.deletePost);

module.exports = router;