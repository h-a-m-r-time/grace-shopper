const router = require('express').Router()
const {Opinion} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const opinions = await Opinion.findAll({
            include: [{all: true}]
        })
        const purchased = opinions.map(op => {
            //console.log("IN HERE THOUGH!!!!!!!!!!!!!!!!!!!!!", op.transactions)
            if(op.transactions && op.transactions.length > 0){
                //console.log("IN HERE")
                op.transactions = op.transactions.filter(trns => {
                    //console.log(trns.purchased)
                    return trns.purchased
                })
            }
            return op
        })
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
