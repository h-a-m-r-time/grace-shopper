const router = require('express').Router()
const { Transaction } = require('../db/models')
const stripe = require('stripe')(process.env.STRIPE_SECRET)
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      where: { purchased: true },
      include: [{ all: true }],
    })
    res.json(transactions)
  } catch (error) {
    next(error)
  }
})

router.put('/', async (req, res, next) => {
  try {
    let transArray = []
    await Promise.all(
      req.body.transactions.map(async transaction => {
        const updatedValue = await Transaction.update(
          { ...transaction, purchased: true },
          {
            where: { id: transaction.id },
            returning: true,
          }
        )
        transArray.push(updatedValue[1])
      })
    )
    req.body.stripeObject && (await stripe.charges.create(req.body.stripeObject))
    res.json(transArray)
  } catch (err) {
    next(err)
  }
})
