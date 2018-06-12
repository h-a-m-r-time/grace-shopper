import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOpinions } from '../store'
import { SimpleCard } from './index'

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
        // case 'topOpinions':
        //   filteredOpinions = this.props.topOpinions
        //   break
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
    return <div>{this.renderOpinions()}</div>
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

let topOpinions = []
state.opinionReducer.opinions
.map(opinion => {
  if (!topOpinions.length){
    topOpinions.push(opinion)
  } else {
    for (let i = 0; i < topOpinions.length; i++) {
      if (opinion.transactions && opinion.transactions.length > topOpinions[i].transactions.length){
        topOpinions = [...topOpinions.slice(0, i), opinion, ...topOpinions.slice(i, 4)]
      }
    }
  }
})

// let topPaidOpinions = []
// state.opinionReducer.opinions
// .map(opinion => {
//   if (!topPaidOpinions.length){
//     let topPrice = 0
//     for (let i = 0; i < state.opinionReducer.opinions.transactions.length; i++) {
//       if (state.opinionReducer.opinions.transactions[i].amount > topPrice){
//         topPrice = state.opinionReducer.opinions.transactions[i].amount
//       }
//     }

//     topOpinions.push(opinion)
//   } else {
//     for (let i = 0; i < topOpinions.length; i++) {
//       if (opinion.transactions.length > topOpinions[i].transactions.length){
//         topOpinions = [...topOpinions.slice(0, i), opinion, ...topOpinions.slice(i, 4)]
//       }
//     }
//   }
// })

  return {
    opinions: state.opinionReducer.opinions,
    myOpinions: myOpinions,
    topOpinions: topOpinions,
    newOpinions: newOpinions,
    // topPaidOpinions: topPaidOpinions
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
