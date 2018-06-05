const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/things', require('./things'))
router.use('/feelings', require('./feelings'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
