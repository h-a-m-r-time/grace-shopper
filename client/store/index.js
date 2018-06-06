import { createStore, combineReducers, applyMiddleware } from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import transaction from './transaction'
import currentCart from './currentCart'
import feelingReducer from './feeling'
import thingReducer from './thing'

const reducer = combineReducers({
  user,
  transaction,
  currentCart,
  feelingReducer,
  thingReducer,
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
