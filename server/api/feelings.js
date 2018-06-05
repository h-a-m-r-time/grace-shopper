const router = require('express').Router()
const {Feeling} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const feelings = await Feeling.findAll()
        res.json(feelings)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const feeling = await Feeling.findById(req.params.id)
        res.json(feeling)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const feeling = await Feeling.create(req.body)
        res.json(feeling)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
      const feeling = await Feeling.update(req.body, { where: {id: req.body.id} })
      res.json(feeling)
  } catch (err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
      await Feeling.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)
  }
})
