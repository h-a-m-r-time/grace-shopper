const router = require('express').Router()
const {Opinion} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const opinions = await Opinion.findAll({
            include: [{all: true}]
        })
        //trying to filter out opinions' transactions that flagged purchased as false
        //everything returns as expected but then when the res is sent it ignores teh purchased property
        //originally i was trying to jsut modify the transactions property but still wouldn't change length
        //even though it was reporting it did change
        //I suspect maybe this is something about persisting a sequelize return object?
        const purchased = opinions.map(op => {
            console.log("IN HERE THOUGH!!!!!!!!!!!!!!!!!!!!!", op.transactions)
            let transactions;
            if(op.transactions && op.transactions.length > 0){
                console.log("IN HERE", op.transactions.length)
                transactions = op.transactions.filter(trns => {
                    console.log(trns.purchased)
                    return trns.purchased === true
                })
            }
            console.log("OUT HERE", op.transactions.length, transactions.length)
            op.purchased = transactions
            console.log(op.purchased, op)
            return op
        })
        console.log("OUT MORE", purchased[2].transactions.length, purchased[2].purchased.length)
        res.json(purchased)
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
    try {
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
      await Opinion.destroy({where: {id: +req.params.id}})
      res.json(req.params.id)
  } catch (err){
      next(err)
  }
})
