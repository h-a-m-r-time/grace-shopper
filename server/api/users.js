const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next)
})

// router.get('/:id', (req, res, next) => {
//   User.findById(req.params.id, {
//         // explicitly select only the id and email fields - even though
//         // users' passwords are encrypted, it won't help if we just
//         // send everything to anyone who asks!
//         attributes: ['id', 'email']
//     })
//     .then(user => res.json(user))
//     .catch(next)
// })
//
// router.post('/', async (req, res, next) => {
//     try{
//         const user = await User.create(req.body)
//         res.json(user)
//     } catch (err) {
//         next(err)
//     }
// })
//
// router.put('/:id', async (req, res, next) => {
//   try {
//       const user = await User.update(req.body, { where: {id: req.body.id} })
//       res.json(user)
//   } catch (err){
//       next(err)
//   }
// })
//
// router.delete('/:id', async (req, res, next) => {
//   try {
//       User.destroy({where: {id: +req.params.id}})
//       res.json(req.params.id)
//   } catch (err){
//       next(err)
//   }
// })
