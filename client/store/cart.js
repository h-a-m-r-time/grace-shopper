import axios from 'axios'
// import history from '../history'
//ACTION TYPES

const GET_CART = 'GET_CART'
const POST_CART = 'POST_CART'
const DELETE_ITEM = 'DELETE_ITEM'

const defaultCart = []

const getCart = cart => ({type: GET_CART, cart})

const postedCart = cart => ({type: POST_CART, cart})

const deleteItem = (itemId) => {
  return {
    type: DELETE_ITEM,
    itemId
  }
}

export const fetchCart = (userId) => {
  return async dispatch => {
    //we won't be making this route after all, we are going to filter the cart by the id here
    const response = await axios.get(`/api/cart/`)
    const cart = response.data
    const filterCart = cart.filter(trans => {
        return trans.userId === userId
    })
    const action = getCart(filterCart)
    dispatch(action)
  }
}

export const postCart = (opinionObj, history) => {
    return async dispatch => {
        const response = await axios.post('/api/cart', opinionObj)
        const cartItem = response.data
        await dispatch(postedCart(cartItem))
        if (history){
          history.push('/cart')}
    }
}

export const removeItem = (id) => {
  return async dispatch => {
      console.log("IN THE REMOVE", id)
    const response = await axios.delete(`/api/cart/${id}`)
    const opinionData = response.data
    const action = deleteItem(opinionData)
    dispatch(action)
  }
}

const cart = ( state = defaultCart, action) => {
  switch (action.type) {
    case GET_CART: {
      return action.cart
    }
    case POST_CART: {
        return [...state, action.cart]
    }
    case DELETE_ITEM: {
      return [...state.filter(opinion => {
        return opinion.id !== Number(action.itemId)
      })]
    }
    default: {
      return state
    }
  }
}

export default cart;
