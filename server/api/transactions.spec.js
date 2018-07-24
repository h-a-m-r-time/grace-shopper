const {expect} = require('chai')
const request = require('supertest')
const db = require('../db')
const app = require('../')
const Transaction = db.model('transaction')

describe('Transaction routes', () => {

    beforeEach(() => {
        return db.sync({force: true})
    })

    describe('GET /api/transactions', () => {
        let id
        beforeEach(() => {
            const transactions = [{
                amount: 0,
                purchased: true,
                transactions_opinionId_fkey: 1,
                transactions_userId_fkey: 1
            }, {
                amount: 0,
                purchased: true,
                transactions_opinionId_fkey: 2,
                transactions_userId_fkey: 1
            }]
            return Transaction.bulkCreate(transactions, {returning: true})
                .then(createdCart => {
                    id = createdCart[1].id
                })
        })
        it('browses cart and returns a json array', () => {
            return request(app)
                .get('/api/transactions')
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[1].amount).to.be.equal('0')
                    expect(res.body[0].purchased).to.be.equal(true)
                })
        })
        it('reads a cart item when browsed with an appropriate parameter and returns a json object', () => {
            return request(app)
                .get(`/api/transactions/${id}`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.amount).to.be.equal('0')
                })
        })
    })

    describe('PUT api/transactions/', () => {
        let id
        beforeEach(() => {
            const transactions = [{
                amount: 0,
                purchased: false,
                transactions_opinionId_fkey: 1,
                transactions_userId_fkey: 1
            }, {
                amount: 0,
                purchased: false,
                transactions_opinionId_fkey: 2,
                transactions_userId_fkey: 1
            }]
            return Transaction.bulkCreate(transactions, {returning: true})
                .then(createdCart => {
                    id = createdCart[1].id
                })
        })
        it('updates a transaction and responds with JSON', () => {
            return request(app)
                .put(`/api/transactions/`)
                .send({transactions: [{
                    amount: 0,
                    purchased: true,
                    id: id
                }]})
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('array')
                    expect(res.body[0][0].amount).to.be.equal('0')
                    expect(res.body[0][0].purchased).to.be.equal(true)
                })
        })

    })
})
