const router = require('express').Router();
const categoryController = require('../controllers/categoryController')

router.post('/', categoryController.createCategory);
router.get('/:id', categoryController.getCategory);
router.put('/:id', categoryController.editCategory);
router.delete('/:id', categoryController.deleteCategory);


module.exports = router;