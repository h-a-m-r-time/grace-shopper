import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOpinions } from '../store'
import { SimpleCard } from './index'

class OpinionList extends Component {
  renderOpinions() {
    if (this.props.opinions.length) {
      let filteredOpinions = []
      switch (this.props.displayOrder) {
        case 'newOpinions':
          filteredOpinions = this.props.newOpinions
          break
        case 'myOpinions':
          filteredOpinions = this.props.myOpinions
          break
        default:
          break;
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

// let topOpinions = []
// state.opinionReducer.opinions
// .map(opinion => {
//   if (!topOpinions.length){
//     topOpinions.push(opinion)
//   } else {
//     for (let i = 0; i < topOpinions.length; i++) {
//       if (opinion.transactions.length > topOpinions[i].transactions.length){
//         topOpinions = [...topOpinions.slice(0, i), opinion, ...topOpinions.slice(i, 4)]
//       }
//     }
//   }
// })

  // console.log(state, myOpinions)

  // let topPaidOpinions = []
  // state.opinionReducer.opinions
  // .map(opinion => {
  //   if (!topPaidOpinions.length && opinion){
  //     topOpinions.push(opinion)
  //   } else {
  //     for (let i = 0; i < topOpinions.length; i++) {
  //       if (opinion.transactions.length > topOpinions[i].transactions.length){
  //         topPaidOpinions = [...topPaidOpinions.slice(0, i), opinion, ...topPaidOpinions.slice(i, 4)]
  //       }
  //     }
  //   }
  // })

  return {
    opinions: state.opinionReducer.opinions,
    myOpinions: myOpinions,
    // topOpinions: topOpinions,
    newOpinions: newOpinions,
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
