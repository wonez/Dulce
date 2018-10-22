const router = require('express').Router();
const postController = require('../controllers/postController.js');

router.post('/', postController.createPost);

router.get('/:id', postController.getPost);
router.get('/', postController.getManyPosts);

router.put('/:id', postController.editPost);

router.delete('/:id', postController.deletePost);

module.exports = router;