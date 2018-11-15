const router = require('express').Router();

const postRouter = require('./routes/postRouter.js')
const userRouter = require('./routes/userRouter.js')
const categoryRouter = require('./routes/categoryRouter.js')
const searchRouter = require('./routes/searchRouter.js');

router.use('/post', postRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/search', searchRouter)

module.exports = router;