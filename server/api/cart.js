const router = require('express').Router()
const {Transaction} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({where: {purchased: false}, include: [{all: true}]})
        res.json(transactions)
    } catch (error) {
        next(error)
    }
})

router.get('/users/:id', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({where: {userId: req.params.id, purchased: false}})
        res.json(transactions)
    } catch (error){
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id, {where: {purchased: false}})
        res.json(transaction)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const request = {...req.body, purchased: false}
        const transaction = await Transaction.create(request, {include: [{all: true}]})
        res.json(transaction)
    } catch (err) {
        next(err)
    }
})

router.put('/:id', async (req, res, next) => {
  try {
      const transaction = await Transaction.update(req.body, { where: {id: req.body.id} })
      res.json(transaction)
  } catch (err){
      next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
      await Transaction.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)
  }
})
