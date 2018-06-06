import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Opinion extends Component (props) {





  render() {
    const transactions = this.props.transactions
    return (
      <div>
        <h2> I {name} {
          transactions.opinion
        }</h2>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transactions
})

export default connect(mapStateToProps, null)(Opinion)
