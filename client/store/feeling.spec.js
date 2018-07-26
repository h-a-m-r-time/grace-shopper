import { expect } from 'chai'
import {getFeelings, createFeeling} from './feeling'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import thunkMiddleware from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Feeling Thunk Creators', () => {
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

  describe('getFeelings', () => {
      it('eventually dispatches the GET_FEELINGS action', () => {
          const fakeFeeling = [{name: 'Love', category: 'verb'}]
          mockAxios.onGet('/api/feelings').replyOnce(200, fakeFeeling)
          return store.dispatch(getFeelings()).then(() => {
              const actions = store.getActions()
              expect(actions[0].type).to.be.equal('GET_FEELINGS')
              expect(actions[0].feelings).to.be.deep.equal(fakeFeeling)
          })
      })
  })

  describe('addFeeling', () => {
    it('eventually dispatches the ADD_FEELING action', () => {
      const newFeeling = {name: 'Hate', category: 'verb'}
      mockAxios.onPost('/api/feelings').replyOnce(204, newFeeling)
      return store.dispatch(createFeeling(newFeeling)).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('ADD_FEELING')
        expect(actions[0].feeling).to.be.deep.equal(newFeeling)
      })
    })
  })
})
