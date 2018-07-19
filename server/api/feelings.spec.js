const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Feeling = db.model('feeling')

describe('Feeling routes', () => {

    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('GET /api/feelings', () => {
        const firstFeeling = 'hate'
        const secondFeeling = 'love'
        let love
        beforeEach(() => {
            const feelings = [{
                name: firstFeeling,
                category: 'verb'
            }, {
                name: secondFeeling,
                category: 'verb'
            }]
            return Feeling.bulkCreate(feelings, {returning: true})
                .then(createdFeelings => {
                    love = createdFeelings[1].id
                })
        })
        it('browses feelings and returns a json array', () => {
            return request(app)
                .get('/api/feelings')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(firstFeeling)
                    expect(res.body[1].category).to.be.equal('verb')
                })
        })
        it('reads a feeling when browsed with an appropriate parameter and returns a json object', () => {
            return request(app)
                .get(`/api/feelings/${love}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.be.equal(secondFeeling)
                })
        })
    })

    describe('POST api/feelings/', () => {
        it('adds a feeling and responds with JSON', () => {
            return request(app)
                .post('/api/feelings')
                .send({
                  name: 'testFeeling',
                  category: 'verb'
                })
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.be.equal('testFeeling')
                    expect(res.body.category).to.be.equal('verb')
                })
        })

    })
})
