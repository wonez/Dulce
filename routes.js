const router = require('express').Router();

const postRouter = require('./routes/postRouter.js')
const userRouter = require('./routes/userRouter.js')
const categoryRouter = require('./routes/categoryRouter.js')

router.use('/post', postRouter)
router.use('/user', userRouter)
router.use('/category', categoryRouter)

module.exports = router;