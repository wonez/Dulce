const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;