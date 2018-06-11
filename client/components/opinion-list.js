import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOpinions } from '../store'
import { SimpleCard } from './index'

class OpinionList extends Component {
  renderOpinions() {
    if (this.props.opinions.length) {
      return this.props.opinions.map(opinion => {
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

const mapStateToProps = state => ({
  opinions: state.opinionReducer.opinions,
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
