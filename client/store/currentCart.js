import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_CART = 'GET_CART'
const DELETE_OPINION = 'DELETE_OPINION'

const initState = []

export const getCart = (cart) => {
  return {
    type: GET_CART,
    cart
  }
}

export const deleteOpinion = (opinionId) => {
  return {
    type: DELETE_OPINION,
    opinionId
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

export const removeOpinion = (opinionId) => {
  return async dispatch => {
    const response = await axios.delete(`/api/cart/:${opinionId}`)
    const opinionData = response.data
    const action = deleteOpinion(opinionData)
    dispatch(action)
  }
}

const currentCart = ( state = initState, action) => {
  switch (action.type) {
    case GET_CART: {
      return [...state, ...action.cart]
    }
    case DELETE_OPINION: {
      return [...state, state.cart.filter(opinion => {
        return opinion.id !== action.opinionId
      })]
    }
    default: {
      return state
    }
  }
}

export default currentCart;
