const router = require('express').Router()
const {Transaction} = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const transactions = await Transaction.findAll({
            where: {purchased: true},
            include: [{all: true}]
        })
        res.json(transactions)
    } catch (error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id, {where: {purchased: true}})
        res.json(transaction)
    } catch (error){
        next(error)
    }
})

router.post('/', async (req, res, next) => {
    try{
        const request = {...req.body, purchased: true}
        const transaction = await Transaction.create(request)
        res.json(transaction)
    } catch (err) {
        next(err)
    }
})

router.put('/', async (req, res, next) => {
  try {
      const transactions = await Promise.all(req.body.transactions.map(transaction => {
          return Transaction.update({...transaction, purchased: true}, { where: {id: transaction.id} })
      }))
      const token = req.body.stripeObject.source
      const charge = stripe.charges.create(req.body.stripeObject)
      res.json(transactions.data)
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
