const router = require('express').Router()
const {Thing} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const things = await Thing.findAll()
        res.json(things)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const thing = await Thing.findById(req.params.id)
        res.json(thing)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const thing = await Thing.create(req.body)
        res.json(thing)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
      const thing = await Thing.update(req.body, { where: {id: req.body.id} })
      res.json(thing)
  } catch (err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
      Thing.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)
  }
})
