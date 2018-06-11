/* global describe beforeEach afterEach it */
// import { expect } from 'chai'
// import {getFeelings} from './feeling'
// import axios from 'axios'
// import MockAdapter from 'axios-mock-adapter'
// import configureMockStore from 'redux-mock-store'
// import thunkMiddleware from 'redux-thunk'
// import history from '../history'

// const middlewares = [thunkMiddleware]
// const mockStore = configureMockStore(middlewares)

// describe('feeling thunk creators', () => {
//   let store
//   let mockAxios

//   const initialState = {feelings: {}}

//   beforeEach(() => {
//     mockAxios = new MockAdapter(axios)
//     store = mockStore(initialState)
//   })

//   afterEach(() => {
//     mockAxios.restore()
//     store.clearActions()
//   })

//   describe('getFeelings', () => {
//     it('eventually dispatches the GET_FEELINGS action', () => {
//       const fakeFeeling = {feelings: 'Love'}
//       mockAxios.onGet('/api/feelings').replyOnce(200, fakeFeeling)
//       return store.dispatch(getFeelings()).then(() => {
//         const actions = store.getActions()
//         expect(actions[0].type).to.be.equal('GET_FEELINGS')
//         expect(actions[0].feelings).to.be.deep.equal(fakeFeeling)
//       })
//     })
//   })

//   describe('addFeeling', () => {
//     it('logout: eventually dispatches the ADD_FEELING action', () => {
//       const newFeeling = [ feeling: 'Hate' ]
//       mockAxios.onPost('/api/feelings').replyOnce(204)
//       return store.dispatch(addFeeling()).then(() => {
//         const actions = store.getActions()
//         expect(actions[0].type).to.be.equal('ADD_FEELING')
//         expect(history.location.pathname).to.be.equal('/login')
//       })
//     })
//   })
// })
