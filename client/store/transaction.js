import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'

/**
 * INITIAL STATE
 */
const initState = []

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions,
})

/**
 * THUNK CREATORS
 */
export const getTransactions = () => dispatch =>
  axios
    .get('/api/transactions')
    .then(res => dispatch(gotTransactions(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return [...state, ...action.transactions]
    default:
      return state
  }
}
