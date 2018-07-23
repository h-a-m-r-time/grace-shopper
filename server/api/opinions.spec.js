//TODO add things and feelings models to start building test

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Opinion = db.model('opinion')

describe('Opinion routes', () => {

    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('GET /api/opinions', () => {
        let id
        beforeEach(() => {
            const opinions = [{
                statement: 'I fake fake',
                category: 'verb',
                opinions_feelingId_fkey: 1,
                opinions_thingId_fkey: 1
            }, {
                statement: 'I test test',
                category: 'verb',
                opinions_feelingId_fkey: 2,
                opinions_thingId_fkey: 2
            }]
            return Opinion.bulkCreate(opinions, {returning: true})
                .then(createdOpinions => {
                    id = createdOpinions[1].id
                })
        })
        it('browses opinions and returns a json array', () => {
            return request(app)
                .get('/api/opinions')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    //api won't return without transactions on opinion
                })
        })
        it('reads an opinion when browsed with an appropriate parameter and returns a json object', () => {
            return request(app)
                .get(`/api/opinions/${id}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.statement).to.be.equal('I test test')
                })
        })
    })

    describe('POST api/opinions/', () => {
        it('adds a feeling and responds with JSON', () => {
            return request(app)
                .post('/api/opinions')
                .send({
                    statement: 'I fake test',
                    category: 'verb',
                    opinions_feelingId_fkey: 1,
                    opinions_thingId_fkey: 2
                })
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.statement).to.be.equal('I fake test')
                    expect(res.body.category).to.be.equal('verb')
                })
        })

    })
})
