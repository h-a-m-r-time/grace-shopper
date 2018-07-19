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
    try {
        const thing = await Thing.create(req.body)
        res.status(201).json(thing)
    } catch (err) {
        next(err)
    }
})
