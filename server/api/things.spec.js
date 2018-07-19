const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Thing = db.model('thing')

describe('Thing routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('GET /api/things', () => {
    const firstThing = 'apples'
    const secondThing = 'oranges'
    let apples
    let things

    beforeEach(() => {
      things = [{
        name: firstThing,
        description: 'one a day keeps the doctor away'
      }, {
        name: secondThing,
        description: 'at least it\'s not a banana'
      }]
      return Thing.bulkCreate(things, {returning: true})
        .then(createdThings => {
          apples = createdThings[0].id
        })
    })

    it('browses things and returns a json array', () => {
      return request(app)
        .get('/api/things')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[1].name).to.be.equal(secondThing)
          expect(res.body[0].description).to.be.equal('one a day keeps the doctor away')
        })
    })

    it('reads a thing when browsed with an appropriate parameter and returns a json object', () => {
      return request(app)
        .get(`/api/things/${apples}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal( firstThing )
        })
    })
  })

  describe('POST /api/things', () => {
    it('creates a thing and responds with JSON', () => {
        return request(app)
            .post('/api/things')
            .send({
              name: 'testThing',
              description: 'one a day keeps the doctor away'
            })
            .expect(201)
            .then(res => {
                expect(res.body).to.be.an('object')
                expect(res.body.name).to.be.equal('testThing')
                expect(res.body.description).to.be.equal('one a day keeps the doctor away')
            })
    })
  })
})
