import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FEELINGS = 'GET_FEELINGS'

/**
 * INITIAL STATE
 */
const initState = []

/**
 * ACTION CREATORS
 */
const gotFeelings = feelings => ({
  type: GET_FEELINGS,
  feelings,
})

/**
 * THUNK CREATORS
 */
export const getFeelings = () => dispatch =>
  axios
    .get('/api/feelings')
    .then(res => dispatch(gotFeelings(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_FEELINGS:
      return [...state, ...action.feelings]
    default:
      return state
  }
}
