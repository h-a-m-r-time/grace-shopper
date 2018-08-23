import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOpinions } from '../store'
import { SimpleCard } from './index'

export class OpinionList extends Component {
  renderOpinions() {
    if (this.props.opinions && this.props.opinions.length) {
      let filteredOpinions = []
      let topTransactions = []
      switch (this.props.displayOrder) {
        case 'allOpinions':
          filteredOpinions = this.props.opinions
        break
        case 'newOpinions':
          filteredOpinions = this.props.opinions.filter(
              opinion => opinion.id > this.props.opinions.length - 5
          )
          break
        case 'myOpinions':
          filteredOpinions = this.props.opinions.filter(opinion => {
              if (opinion.transactions){
                  for (let i = 0; i < opinion.transactions.length; i++) {
                      if (opinion.transactions[i].userId === this.props.user){
                          return true
                      }
                  }
              }
                  return false
              })
          break
        case 'topOpinions':
            // for each opinion, find the top transaction
            this.props.opinions.forEach(opinion => {
                if (opinion.transactions){
                    let topTransaction = opinion.transactions.reduce((acc, curr) => {
                        return curr.amount > acc.amount ? curr : acc
                    })

                    // if there are less than 5 top transactions, push opinion and transaction
                    if (topTransactions.length < 5){
                        topTransactions.push(topTransaction)
                        filteredOpinions.push(opinion)
                    } else {
                        // otherwise find the lowest transaction/index
                        let lowTransaction
                        let index
                        for (let i = 0; i < topTransactions.length; i++){
                            if (!lowTransaction || topTransactions[i].amount < lowTransaction){
                                lowTransaction = topTransactions[i]
                                index = i
                            }
                        }
                        // and see if that transaction amount is less than the topTransaction for THIS opinion
                        // if so, replace the opinion/transaction at index
                        if (lowTransaction.amount < topTransaction.amount){
                            topTransactions[index] = topTransaction
                            filteredOpinions[index] = opinion
                        }
                    }
                }
            })
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
    return {
        opinions: state.opinionReducer.opinions,
        user: state.user.id,
    }
}

const mapDispatchToProps = dispatch => ({
  getOpinions: () => {
    return dispatch(getOpinions())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionList)
