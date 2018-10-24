const router = require('express').Router();
const userController = require('../controllers/userController')

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// router.get('/:id', userController.getUser);
router.put('/:id', userController.editUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
