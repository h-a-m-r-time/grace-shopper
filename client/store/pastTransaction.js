import axios from 'axios';
import history from '../history';

/**
 * ACTION TYPES
 */
const GET_TRANSACTIONS = 'GET_TRANSACTIONS';

/**
 * INITIAL STATE
 */
const transactions = [];

/**
 * ACTION CREATORS
 */
const gotTransactions = transactions => ({
  type: GET_TRANSACTIONS,
  transactions,
});

/**
 * THUNK CREATORS
 */
export const getTransactions = () => dispatch =>
  axios
    .get('/api/transactions')
    .then(res => dispatch(gotTransactions(res.data)))
    .catch(err => console.log(err));

/**
 * REDUCER
 */
export default function(state = transactions, action) {
  switch (action.type) {
    case GET_TRANSACTIONS:
      return [...state, ...action.transactions];
    default:
      return state;
  }
}
