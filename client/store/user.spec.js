/* global describe beforeEach afterEach it */
import { expect } from 'chai'
import { me, logout } from './user'
import {getOpinions, getOpinion} from './opinion'
import {getFeelings, createFeeling} from './feeling'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'
import history from '../history'


const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('User thunk creators', () => {
  let store
  let mockAxios

  const initialState = { user: {} }

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  describe('me', () => {
    it('eventually dispatches the GET USER action', () => {
      const fakeUser = { email: 'Cody' }
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      return store.dispatch(me()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('GET_USER')
        expect(actions[0].user).to.be.deep.equal(fakeUser)
      })
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', () => {
      mockAxios.onPost('/auth/logout').replyOnce(204)
      return store.dispatch(logout()).then(() => {
        const actions = store.getActions()
        expect(actions[0].type).to.be.equal('REMOVE_USER')
        expect(history.location.pathname).to.be.equal('/login')
      })
    })
  })
})

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
