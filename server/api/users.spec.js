/* global describe beforeEach it */

const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../index')
const User = db.model('user')
const Feeling = db.model('feeling')

describe('User routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('/api/users/', () => {
    const codysEmail = 'cody@puppybook.com'

    beforeEach(() => {
      return User.create({
        email: codysEmail
      })
    })

    it('GET /api/users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array')
          expect(res.body[0].email).to.be.equal(codysEmail)
        })
    })
  }) // end describe('/api/users')
}) // end describe('User routes')

describe('Feeling routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })

  describe('api/feelings/', () => {
    const firstFeeling = 'hate'
    const secondFeeling = 'love'
    let love

    beforeEach(() => {
      return Feeling.bulkCreate([{
        name: firstFeeling
      }, {
        name: secondFeeling
      }])
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
        })
    })

    it('serves up a specific feeling on GET /feelings/{id}', () => {
      return request(app)
        .get(`/feelings/${love}`)
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('object')
          expect(res.body).to.be.equal({ name: secondFeeling })
        })
    })
  })
})
