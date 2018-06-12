/* global describe beforeEach afterEach it */
import { expect } from 'chai'
import { getThings, createThing } from './thing'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('thing thunk creators', () => {
  let store
  let mockAxios

  const initialState = { thing: [] }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('thing store populates', () => {
    it('eventually dispatches the GET THING action', () => {
      const fakeThing = [
        { id: 1, name: 'cake', description: 'dessert' },
        { id: 2, name: 'apples', description: 'fruit' },
      ]
      mockAxios.onGet('/api/things').replyOnce(200, fakeThing)
      return store.dispatch(getThings()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_THINGS')
        expect(actions[0].things).to.be.deep.equal(fakeThing)
        expect(actions[0].things.length).to.be.deep.equal(2)
      })
    })
  })

  describe('thing store creates new thing', () => {
    it('eventually dispatches the ADD THING action', () => {
      const newFakeThing = [{ id: 1, name: 'cake', description: 'dessert' }]
      mockAxios.onPost('/api/things').replyOnce(200, newFakeThing)
      return store.dispatch(createThing(newFakeThing)).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('ADD_THING')
        expect(actions[0].thing).to.be.deep.equal(newFakeThing)
        expect(actions[0].thing.length).to.be.deep.equal(1)
      })
    })
  })
})
