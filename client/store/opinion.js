import axios from 'axios'

const GET_OPINIONS = 'GET_OPINIONS'
const GET_OPINION = 'GET_OPINION'

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
    default: {
      return state
    }
  }
}
