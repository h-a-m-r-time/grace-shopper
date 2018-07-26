/* global describe beforeEach afterEach it */
import { expect } from 'chai'
import {getOpinions, getOpinion} from './opinion'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Opinion Thunk Creators', () => {
  let store
  let mockAxios

  const initialState = { opinions: [], opinion: {} }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('getOpinions', () => {
    it('eventually dispatches the GET_OPINIONS action', () => {
      const testOpinions = [{statement: 'Pugs are fugly'}]
      mockAxios.onGet('/api/opinions').replyOnce(200, testOpinions)
      return store.dispatch(getOpinions()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_OPINIONS')
        expect(actions[0].opinions).to.be.deep.equal(testOpinions)
      })
    })
  })

  describe('getOpinion', () => {
    it('eventually dispatches the GET_OPINION action', () => {
      const testOpinion = {opinion: 'Hate'}
      mockAxios.onGet(`/api/opinions/1`).replyOnce(200, testOpinion)
      return store.dispatch(getOpinion(1)).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_OPINION')
        expect(actions[0].opinion).to.be.deep.equal(testOpinion)
      })
    })
  })
})
