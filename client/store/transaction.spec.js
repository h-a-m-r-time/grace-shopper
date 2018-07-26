//CHANGE THIS TO A CART SPEC

import { expect } from 'chai'
import {getTransactions, putTransactions} from './transaction'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import thunkMiddleware from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Cart Thunk Creators', () => {
  let store
  let mockAxios

  const initialState = []

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getTransactions', () => {
      it('eventually dispatches the GET_TRANSACTIONS action', () => {
          const fakeTransaction = [{amount: '20', purchased: true, opinionId: 1}]
          mockAxios.onGet('/api/transactions').replyOnce(200, fakeTransaction)
          return store.dispatch(getTransactions()).then(() => {
              const actions = store.getActions()
              expect(actions[0].type).to.be.equal('GET_TRANSACTIONS')
              expect(actions[0].transactions).to.be.deep.equal(fakeTransaction)
          })
      })
  })

  describe('putTransactions', () => {
    it('eventually dispatches the PUT_TRANSACTIONS action', () => {
      const fakeTransaction = [{amount: '30', purchased: true, opinionId: 1}]
      mockAxios.onPut('/api/transactions').replyOnce(204, fakeTransaction)
      return store.dispatch(putTransactions(fakeTransaction)).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('PUT_TRANSACTIONS')
        expect(actions[0].transactions).to.be.deep.equal(fakeTransaction)
      })
    })
  })
})
