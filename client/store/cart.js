import axios from 'axios'
import history from '../history'

//ACTION TYPES

const GET_CART = 'GET_CART'
const POST_CART = 'POST_CART'

const defaultCart = []

const getCart = cart => ({type: GET_CART, cart})

const postedCart = cart => ({type: POST_CART, cart})

export const fetchCart = (userId) => {
  return async dispatch => {
    //we won't be making this route after all, we are going to filter the cart by the id here
    const response = await axios.get(`/api/cart/:${userId}`)
    const cart = response.data
    const action = getCart(cart)
    dispatch(action)
  }
}

export const postCart = (opinionObj) => {
    return async dispatch => {
        const response = await axios.post('/api/cart', opinionObj)
        const cartItem = response.data
        dispatch(postedCart(cartItem))
    }
}

const cart = ( state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    case POST_CART: {
        return [...state, action.cartItem]
    }
    default: {
      return state
    }
  }
}

export default cart;
