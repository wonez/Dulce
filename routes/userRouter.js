const router = require('express').Router();
const userController = require('../controllers/userController')
const checkAuth = require('../utlity/checkAuth');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

// router.get('/:id', userController.getUser);
router.put('/:id', checkAuth, userController.editUser);
// router.delete('/:id', userController.deleteUser);

module.exports = router;
