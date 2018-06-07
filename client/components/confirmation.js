import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getTransactions } from '../store/transaction'

class OpinionList extends Component {
  renderOpinions() {
    if (this.props.transactions.length) {
      return this.props.transactions.map(transaction => {
        return <div>Transaction {transaction.id}</div>
      })
    } else {
      return 'We can not find your transactions, the pyramid is collapsing'
    }
  }

  componentDidMount() {
    this.props.getOpinions()
  }

  render() {
    return (
      <div>{this.renderTransactions()}</div>
    )
  }
}

const mapStateToProps = state => ({
  transactinos: state.transactionReducer.transactions
})

const mapDispatchToProps = dispatch => ({
  getOpinions: () => {
    return dispatch(getOpinions())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionList)
