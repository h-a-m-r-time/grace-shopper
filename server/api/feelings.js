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
    try {
        const feeling = await Feeling.create(req.body)
        res.status(201).json(feeling)
    } catch (err) {
        next(err)
    }
})
