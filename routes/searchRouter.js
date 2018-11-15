const router = require('express').Router();
const searchController = require('../controllers/searchController.js');
// const checkAuth = require('../utlity/checkAuth');

router.get('/', searchController.searchByValue);
router.get('/recipes', searchController.getMoreRecipes)
router.get('/users', searchController.getMoreUsers)


module.exports = router;