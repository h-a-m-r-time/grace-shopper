const router = require('express').Router()
const {Opinion} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const opinions = await Opinion.findAll()
        res.json(opinions)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const opinion = await Opinion.findById(req.params.id)
        res.json(opinion)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const opinion = await Opinion.create(req.body)
        res.json(opinion)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
      const opinion = await Opinion.update(req.body, { where: {id: req.body.id} })
      res.json(opinion)
  } catch (err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
      Opinion.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)
  }
})
