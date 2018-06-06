import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_THINGS = 'GET_THINGS'

/**
 * INITIAL STATE
 */
const initState = []

/**
 * ACTION CREATORS
 */
const gotThings = things => ({
  type: GET_THINGS,
  things,
})

/**
 * THUNK CREATORS
 */
export const getThings = () => dispatch =>
  axios
    .get('/api/things')
    .then(res => dispatch(gotThings(res.data)))
    .catch(err => console.log(err))

/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_THINGS:
      return [...state, ...action.things]
    default:
      return state
  }
}
