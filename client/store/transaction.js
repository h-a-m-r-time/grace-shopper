import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const PUT_TRANSACTIONS = 'PUT_TRANSACTIONS'
const GET_TOP_TRANSACTION = 'GET_TOP_TRANSACTION'

/**
 * INITIAL STATE
 */
const initState = []

/**
 * ACTION CREATORS
 */
const gotTopTransaction = transaction => ({
  type: GET_TOP_TRANSACTION,
  transaction
})

const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions,
})

const puttedTransactions = transactions => ({
  type: PUT_TRANSACTIONS,
  transactions,
})

/**
 * THUNK CREATORS
 */
export const getTopTransaction = () => dispatch =>
  axios
    .get('api/transactions/:id/max')
    .then(res => dispatch(gotTopTransaction(res.data)))
    .catch(err => console.log(err))

export const getTransactions = () => dispatch =>
  axios
    .get('/api/transactions')
    .then(res => dispatch(gotTransactions(res.data)))
    .catch(err => console.log(err))

export const putTransactions = transactionObj => async dispatch => {
  try {
    const response = await axios.put('/api/transactions', transactionObj)
    const transactions = response.data
    dispatch(puttedTransactions(transactions))
    history.push('/confirmation')
  } catch (err) {
    console.log(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_TOP_TRANSACTION:
      return [...state, ...action.transaction]
    case GET_TRANSACTIONS:
      return [...state, ...action.transactions]
    case PUT_TRANSACTIONS:
      return [...state, ...action.transactions]
    default:
      return state
  }
}
