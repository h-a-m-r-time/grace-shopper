import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_THINGS = 'GET_THINGS'
const ADD_THING = 'ADD_THING'

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

const addThing = thing => ({
  type: ADD_THING,
  thing
})

/**
 * THUNK CREATORS
 */
export const getThings = () => dispatch =>
  axios
    .get('/api/things')
    .then(res => dispatch(gotThings(res.data)))
    .catch(err => console.log(err))

export const createThing = (thingObj) => {
     return async dispatch => {
         console.log('about to send off to things')
         const response = await axios.post('/api/things', thingObj)
         const thing = response.data
         dispatch(addThing(thing))
         return thing;
     }
}
/**
 * REDUCER
 */
export default function(state = initState, action) {
  switch (action.type) {
    case GET_THINGS:
      return [...state, ...action.things]
    case ADD_THING:
      return [...state, action.thing]
    default:
      return state
  }
}
