import axios from 'axios'

const GET_TRANSACTION = 'GET_TRANSACTION'
const GET_THING = 'GET_THING'
const GET_FEELING = 'GET_FEELING'

const defaultTransaction = {}

const gotTransaction = transaction => ({
  type: GET_TRANSACTION,
  transaction
})

const gotThing = thing => ({
  type: GET_THING,
  thing
})

export const getTransaction = (transactionId) => {
  return async dispatch => {
    const response = await axios.get(`/api/transactions/:${transactionId}`)
    const transaction = response.data
    const action = gotTransaction(transaction)
    dispatch(action)
  }
}



const currentTransaction = (state = defaultTransaction, action) => {
  switch (action.type) {
    case GET_TRANSACTION: {
      return action.transaction
    }

    default:
      return state
  }
}

export default currentTransaction
