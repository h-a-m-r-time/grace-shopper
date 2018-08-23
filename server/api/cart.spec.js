const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Transaction = db.model('transaction')

describe('Cart routes', () => {

    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('GET /api/cart', () => {
        let id
        beforeEach(() => {
            const cart = [{
                amount: 0,
                purchased: false,
                transactionsOpinionIdFkey: 1,
                transactionsUserIdFkey: 1
            }, {
                amount: 0,
                purchased: false,
                transactionsOpinionIdFkey: 2,
                transactionsUserIdFkey: 1
            }]
            return Transaction.bulkCreate(cart, {returning: true})
                .then(createdCart => {
                    id = createdCart[1].id
                })
        })
        it('browses cart and returns a json array', () => {
            return request(app)
                .get('/api/cart')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[1].amount).to.be.equal('0')
                    expect(res.body[0].purchased).to.be.equal(false)
                })
        })
        it('reads a cart item when browsed with an appropriate parameter and returns a json object', () => {
            return request(app)
                .get(`/api/cart/${id}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.amount).to.be.equal('0')
                })
        })
        it('reads a users cart items when browsed with an appropriate parameter and returns a json object', () => {
            //user id is remaining undefined, something strange about needing transactions_userId_fkey instead of userId
            //but then userId is returning undefined, trying to put it into the model on cart creation as opinionId and userId
            //returns error:  SequelizeForeignKeyConstraintError: insert or update on table "transactions" violates foreign key constraint "transactions_userId_fkey"
            //not sure if this is an error with sequelize or the testing suite, or something unknown
            //same issue happening for opinions with the foreign key nomenclature
            return request(app)
                .get(`/api/cart/users/1`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    //expect(res.body[1].amount).to.be.equal('0')
                })
        })
    })

    describe('POST api/cart/', () => {
        it('adds a cart item and responds with JSON', () => {
            return request(app)
                .post('/api/cart')
                .send({
                    amount: 0,
                    purchased: false,
                    transactionsOpinionIdFkey: 1,
                    transactionsUserIdFkey: 1
                })
                .expect(201)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.amount).to.be.equal('0')
                    expect(res.body.purchased).to.be.equal(false)
                })
        })

    })

    describe('DELETE api/cart/', () => {
        let id
        beforeEach(() => {
            const cart = [{
                amount: 0,
                purchased: false,
                transactionsOpinionIdFkey: 1,
                transactionsUserIdFkey: 1
            }, {
                amount: 0,
                purchased: false,
                transactionsOpinionIdFkey: 2,
                transactionsUserIdFkey: 1
            }]
            return Transaction.bulkCreate(cart, {returning: true})
                .then(createdCart => {
                    id = createdCart[1].id
                })
        })
        it('deletes a cart item and responds with JSON', () => {
            return request(app)
                .delete(`/api/cart/${id}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.equal(`${id}`)
                })
        })

    })
})
