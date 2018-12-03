const router = require('express').Router();

const postRouter = require('./routes/postRouter.js')
const userRouter = require('./routes/userRouter.js')
const categoryRouter = require('./routes/categoryRouter.js')
const searchRouter = require('./routes/searchRouter.js');
const followingRouter = require('./routes/followingRouter')

router.use('/post', postRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)
router.use('/search', searchRouter)
router.use('/following', followingRouter)

module.exports = router;