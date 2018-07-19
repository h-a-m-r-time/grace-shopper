const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Feeling = db.model('feeling')

describe('Feeling routes', () => {
    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('api/feelings/', () => {
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

        it('GET /api/feelings', () => {
            return request(app)
                .get('/api/feelings')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0].name).to.be.equal(firstFeeling)
                    expect(res.body[1].category).to.be.equal('verb')
                })
        })

        it('serves up a specific feeling on GET /feelings/{id}', () => {
            return request(app)
                .get(`/api/feelings/${love}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.name).to.be.equal(secondFeeling)
                })
        })
    })
})
