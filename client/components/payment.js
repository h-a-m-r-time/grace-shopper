import React, { Component } from 'react'
import StripeCheckout from 'react-stripe-checkout'
import { putTransactions } from '../store'
import store from '../store'
// to make this live, replace external data-key

// need the following props:
// amount = this.props.amount
// description =this.props.description

class Payment extends Component {
  onToken = token => {
    console.log('data from payment form', token)
    store.dispatch(
      putTransactions({
        transactions: this.props.transactions,
        stripeObject: {
          description: 'Example charge',
          source: token.id,
          currency: 'usd',
          amount: this.props.amount * 100,
        },
      })
    )
  }
  render() {
    let paymentAmount = 100
    if (this.props.amount) {
      paymentAmount = this.props.amount * 100
    }
    let paymentDescription = 'this'
    if (this.props.description) {
      paymentDescription = this.props.description
    }
    return (
      <div>
        <StripeCheckout
          token={this.onToken}
          stripeKey="pk_test_g6do5S237ekq10r65BnxO6S0"
          name="Certified Opinion Co." // the pop-in header title
          description={"I'm really feeling " + paymentDescription} // the pop-in header subtitle
          image="https://stripe.com/img/documentation/checkout/marketplace.png" // the pop-in header image (default none)
          ComponentClass="div"
          panelLabel="Pay" // prepended to the amount in the bottom pay button
          amount={paymentAmount} // cents
          currency="USD"
        />
      </div>
    )
  }
}

export default Payment
