import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTransactions } from '../store'

class Confirmation extends Component {
  renderTransactions() {
    if (this.props.transactions && this.props.transactions.length) {
      return this.props.transactions.map(transaction => {
        return <div>Transaction {transaction.id}</div>
      })
    } else {
      return 'We can not find your transactions, the pyramid is collapsing'
    }
  }

  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    return (
      <div>{this.renderTransactions()}</div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transaction
})

const mapDispatchToProps = dispatch => ({
  getTransactions: () => {
    return dispatch(getTransactions())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation)
