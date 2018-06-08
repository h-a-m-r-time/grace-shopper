import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_FEELINGS = 'GET_FEELINGS'
const ADD_FEELING = 'ADD_FEELING'

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

const addFeeling = feeling => {
    console.log('in here though')
  return {type: ADD_FEELING,
  feeling}
}

/**
 * THUNK CREATORS
 */
export const getFeelings = () => dispatch => {
  axios
    .get('/api/feelings')
    .then(res => dispatch(gotFeelings(res.data)))
    .catch(err => console.log(err))
}

export function createFeeling(feelingObj) {
    return async dispatch => {
        const response = await axios.post('/api/feelings', feelingObj)
        const feeling = response.data
        dispatch(addFeeling(feeling))
        console.log("FEELING", feeling)
        return feeling;
    }
}


/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_FEELINGS:
      return [...state, ...action.feelings]
    case ADD_FEELING: {
      console.log('adding feeling reducer')
      return [...state, action.feeling]
    }
    default:
      return state
  }
}
