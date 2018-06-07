import axios from 'axios'
import history from '../history'
import { reporters } from 'mocha';

//ACTION TYPES

const GET_CART = 'GET_CART'
const DELETE_ITEM = 'DELETE_ITEM'
const ADD_ITEM = 'ADD_ITEM'
const ADD_FEELING = 'ADD_FEELING'
const ADD_THING = 'ADD_THING'
const ADD_OPINION = 'ADD_OPINION'

const initState = []

export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

export const deleteItem = (opinionId) => {
  return {
    type: DELETE_ITEM,
    opinionId
  }
}

export const addItem = (opinion) => {
  return {
    type: ADD_ITEM,
    opinion
  }
}

export const addItemToCart = (item) => {
  return async dispatch => {
    const response = await axios.post(`/api/cart/`, item)
    const itemData = response.data
    const action = addItem(itemData)
    dispatch(action)
  }
}

export const fetchCart = (userId) => {
  return async dispatch => {
    const response = await axios.get(`/api/cart/users/:${userId}`)
    const cart = response.data
    const action = getCart(cart)
    dispatch(action)
  }
}

export const removeItem = (opinionId) => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/:${opinionId}`)
    const opinionData = response.data
    const action = deleteItem(opinionData)
    dispatch(action)
  }
}

const currentCart = ( state = initState, action) => {
  switch (action.type) {
    case GET_CART: {
      return [...state, ...action.cart]
    }
    case DELETE_ITEM: {
      return [...state, state.cart.filter(opinion => {
        return opinion.id !== action.opinionId
      })]
    }
    case ADD_ITEM: {
      return [...state, action.opinion]
    }
    default: {
      return state
    }
  }
}

export default currentCart;


// export const addFeeling = (feeling) => {
//   return {
//     type: ADD_FEELING,
//     feeling
//   }
// }

// export const addThing = (thing) => {
//   return {
//     type: ADD_THING,
//     thing
//   }
// }

// export const addOpinion = (opinion) => {
//   return {
//     type: ADD_OPINION,
//     opinion
//   }
// }

// export const addItemToCart = (opinionObj) => {
//   return async dispatch => {
//     if(!opinionObj.feeling.id) {
//       const response = await axios.post('/api/feelings/', opinionObj.feeling)
//       const feelingData = response.data
//       const feelingAction = addFeeling(feelingData)
//       dispatch(feelingAction)
//     }

//     if(!opinionObj.feeling.id) {
//       const response = await axios.post('/api/feelings/', opinionObj.thing)
//       const thingData = response.data
//       const thingAction = addThing(thingData)
//       dispatch(thingAction)
//     }

//     if(opinionObj.feeling.id) {
//       const response = await axios.post('/api/opinions/', opinionObj)
//       const opinionData = response.data
//       const opinionAction = addOpinion(opinionData)
//       dispatch(opinionAction)
//     }

//   }
// }
