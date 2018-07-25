//CHANGE THIS TO A CART SPEC

import { expect } from 'chai'
import {fetchCart, postCart, removeItem} from './cart'
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

  describe('fetchCart', () => {
      it('eventually dispatches the GET_CART action', () => {
          const fakeCart = [{amount: '0', purchased: false, opinionId: 1}]
          mockAxios.onGet('/api/cart/').replyOnce(200, fakeCart)
          return store.dispatch(fetchCart()).then(() => {
              const actions = store.getActions()
              expect(actions[0].type).to.be.equal('GET_CART')
              expect(actions[0].cart).to.be.deep.equal(fakeCart)
          })
      })
  })

  describe('postCart', () => {
    it('eventually dispatches the POST_CART action', () => {
      const fakeCart = [{amount: '0', purchased: false, opinionId: 1}]
      mockAxios.onPost('/api/cart').replyOnce(204, fakeCart)
      return store.dispatch(postCart(fakeCart)).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('POST_CART')
        console.log("ACTIONS!!!!", actions[0])
        expect(actions[0].cart).to.be.deep.equal(fakeCart)
      })
    })
  })
})
