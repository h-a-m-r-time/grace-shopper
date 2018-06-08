import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import transaction from './transaction'
import cart from './cart'
import feelings from './feeling'
import things from './thing'
import opinionReducer from './opinion'

const reducer = combineReducers({
  user,
  transaction,
  cart,
  feelings,
  things,
  opinionReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './transaction'
export * from './cart'
