import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_CART = 'GET_CART'

const defaultCart = {}

const getCart = items => ({type: GET_CART, cart})

export const fetchCart = (userId) => {
  return async dispatch => {
    const response = await axios.get(`/api/cart/:${userId}`)
    const cart = response.data
    const action = getCart(cart)
    dispatch(action)
  }
}

const currentCart = ( state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    default: {
      return state
    }
  }
}

export default currentCart;
