import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOpinions, getTopTransaction } from '../store'
import { SimpleCard } from './index'
// import transaction from '../store/transaction';
// import transaction from '../store/transaction';
// import { access } from 'fs';

class OpinionList extends Component {
  renderOpinions() {
    if (this.props.opinions.length) {
      let filteredOpinions = []
      switch (this.props.displayOrder) {
        case 'allOpinions':
        filteredOpinions = this.props.opinions
        break
        case 'newOpinions':
          filteredOpinions = this.props.newOpinions
          break
        case 'myOpinions':
          filteredOpinions = this.props.myOpinions
          break
        case 'topOpinions':
          filteredOpinions = this.props.topOpinions
          break
        default:
          break
      }

      return filteredOpinions.map(opinion => {
        return (
          <SimpleCard
            category={opinion.category}
            statement={opinion.statement}
            key={opinion.id}
          />
        )
      })
    } else {
      return 'There are no opinions to show!'
    }
  }

  componentDidMount() {
    this.props.getOpinions()
  }

  render() {
    return <div className="cardWrapper" >{this.renderOpinions()}</div>
  }
}

const mapStateToProps = state => {

const newOpinions = state.opinionReducer.opinions.filter(
  opinion => opinion.id > state.opinionReducer.opinions.length - 5
)

const myOpinions = state.opinionReducer.opinions
.filter(opinion => {
  if (opinion.transactions){
    for (let i = 0; i < opinion.transactions.length; i++) {
      if (opinion.transactions[i].userId === state.user.id){
        return true
      }
    }
  }
  return false
})

// we want to populate topOpinions with
let topTransactions = []
let topOpinions = []

// for each opinion, find the top transaction
state.opinionReducer.opinions
.forEach(opinion => {
  if (opinion.transactions){
    let topTransaction = opinion.transactions.reduce((acc, curr) => {
      return curr.amount > acc.amount ? curr : acc
    })

    // if there are less than 5 top transactions, push opinion and transaction
    if (topTransactions.length < 5){
      topTransactions.push(topTransaction)
      topOpinions.push(opinion)
    } else {
      // otherwise find the lowest transaction/index
      let lowTransaction
      let index
      for (let i = 0; i < topTransactions.length; i++){
        if (!lowTransaction ||
          topTransactions[i].amount < lowTransaction){
          lowTransaction = topTransactions[i]
          index = i
        }
      }
      // and see if that transaction amount is less than the topTransaction for THIS opinion
      // if so, replace the opinion/transaction at index
      if (lowTransaction.amount < topTransaction.amount){
        topTransactions[index] = topTransaction
        topOpinions[index] = opinion
      }
    }
  }
  // topTransactions.push(topTransaction)
  // console.log(topTransaction)
})


  return {
    opinions: state.opinionReducer.opinions,
    myOpinions: myOpinions,
    topOpinions: topOpinions,
    newOpinions: newOpinions,
  }
}

const mapDispatchToProps = dispatch => ({
  getTopTransaction: () => {
    return dispatch(getTopTransaction())
  },
  getOpinions: () => {
    return dispatch(getOpinions())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionList)
