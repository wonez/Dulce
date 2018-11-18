const router = require('express').Router();
const categoryController = require('../controllers/categoryController')

router.get('/', categoryController.getCategories)
router.get('/:id', categoryController.getCategoryPosts)
router.post('/', categoryController.createCategory);
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;