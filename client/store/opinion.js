import axios from 'axios'
import {addThing, addFeeling} from './'

const GET_OPINIONS = 'GET_OPINIONS'
const GET_OPINION = 'GET_OPINION'
const ADD_OPINION = 'ADD_OPINION'


const initState = {
  opinions: [],
  opinion: {}
}

const gotOpinions = opinions => ({
  type: GET_OPINIONS,
  opinions,
})

const gotOpinion = opinion => ({
  type: GET_OPINION,
  opinion,
})

const addOpinion = opinion => ({
  type: ADD_OPINION,
  opinion,
})

export const getOpinions = () => dispatch =>
  axios
    .get('/api/opinions')
    .then(res => dispatch(gotOpinions(res.data)))
    .catch(err => console.log(err))

export const getOpinion = (id) => dispatch =>
  axios
    .get(`/api/opinions/${id}`)
    .then(res => dispatch(gotOpinion(res.data)))
    .catch(err => console.log(err))

//power thunk, creates things, feelings, and opinions
//might not even need post things and feelings thunks
export const addNewOpinion = (opinionObj, history) => {
  return async dispatch => {
      if(!opinionObj.feelingId) {
          const feeling = await axios.post('/api/feelings', {name: opinionObj.feeling, category: opinionObj.category})
          opinionObj.feelingId = feeling.data.id
          dispatch(addFeeling(feeling.data))
      }
      if(!opinionObj.thingId) {
          const thing = await axios.post('/api/things', {name: opinionObj.thing})
          opinionObj.thingId = thing.data.id
          dispatch(addThing(thing.data))
      }
      const response = await axios.post('/api/opinions', opinionObj)
      const opinion = response.data
      await dispatch(addOpinion(opinion))
      await axios.post('/api/cart', {opinionId: opinion.id, amount: 0.0, userId: opinionObj.userId})
      if (history){
        history.push('/cart')}
      return opinion
  }
}

export default function(state = initState, action) {
  switch (action.type) {
    case GET_OPINIONS:
      return {
        ...state, opinions: action.opinions
      }
    case GET_OPINION:
      return {
        ...state, opinion: action.opinion
      }
    case ADD_OPINION:
        console.log(action.opinion)
      return {
        ...state, opinions: [...state.opinions, action.opinion]
      }
    default: {
      return state
    }
  }
}
