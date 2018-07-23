const router = require('express').Router()
const {Opinion, Transaction, Feeling, Thing} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
    try {
        const opinions = await Opinion.findAll({
            include: [{model: Transaction, where: {purchased: true}}, {model: Feeling}, {model: Thing}]
        })
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
    try {
        const opinion = await Opinion.create(req.body)
        res.status(201).json(opinion)
    } catch (err) {
        next(err)
    }
})
