import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const PUT_TRANSACTIONS = 'PUT_TRANSACTIONS'

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

const puttedTransactions = transactions => ({
  type: PUT_TRANSACTIONS,
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

export const putTransactions = transactionObj => async dispatch => {
  try {
    const response = await axios.put('/api/transactions', transactionObj)
    const transactions = response.data
    dispatch(puttedTransactions(transactions))
  } catch (err) {
    console.log(err)
  }
}
/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return [...state, ...action.transactions]
    case PUT_TRANSACTIONS:
      return [...state, ...action.transactions]
    default:
      return state
  }
}
