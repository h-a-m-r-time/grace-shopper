import React, { Component } from 'react'
import { connect } from 'react-redux'
import { me, fetchCart, removeItem } from '../store/'
import { CartFormTmpl as FormTmpl } from './'

/**
 * Class for users cart
 * @extends Component
 */
export class CartForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      description: '',
        cart: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {
    this.props.getUser()
    this.props.getUserCart(this.props.user.id)
  }

  handleChange = (item, ev) => {
    let priceChangeCart = [...this.props.cart]
    let price = 0;
    for (let i = 0; i < priceChangeCart.length; i++){
        if (priceChangeCart[i].id === item.id){
            priceChangeCart[i].amount = ev.target.value;
        }
        price += +priceChangeCart[i].amount
    }
    this.setState({
        cart: priceChangeCart,
        amount: price
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleDelete = itemId => {
    this.props.deleteItem(itemId)
  }

  render() {
      const propSetup = {
          ...this.props,
          handleSubmit: this.handleSubmit,
          handleChange: this.handleChange,
          handleDelete: this.handleDelete,
          amount: this.state.amount,
          description: this.state.description,
          transactions: this.state.cart
      }
    return (
      <FormTmpl {...propSetup} />
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
})

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: user => dispatch(fetchCart(user)),
    getUser: () => dispatch(me()),
    deleteItem: opinionId => dispatch(removeItem(opinionId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartForm)
