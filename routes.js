const router = require('express').Router();

const postRouter = require('./routes/postRouter.js');

router.use('/post', postRouter)

module.exports = router;