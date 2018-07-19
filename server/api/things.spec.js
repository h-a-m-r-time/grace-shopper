const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Thing = db.model('thing')

describe('Thing routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/things/', () => {
    const firstThing = 'apples'
    const secondThing = 'oranges'
    let apples

    beforeEach(() => {

      const things = [{
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

    it('GET /api/things', () => {
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

    it('serves up a specific feeling on GET /things/{id}', () => {
      return request(app)
        .get(`/api/things/${apples}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body.name).to.be.equal( firstThing )
        })
    })
  })
})
