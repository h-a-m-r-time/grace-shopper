import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getOpinions } from '../store/opinion'
import Opinion from './opinion'

class OpinionList extends Component {
  renderOpinions() {
    console.log('renderOpinions', this.props)
    if (this.props.opinions && this.props.opinions.length) {
      return this.props.opinions.map(opinion => {
        return <Opinion opinion={opinion} key={opinion.id} />
      })
    } else {
      return 'There are no opinions to show!'
    }
  }

  componentDidMount() {
    console.log('componentDidMount()', this.props)
    this.props.getOpinions()
  }

  // componentWillReceiveProps(props) {
  //   console.log('PROPS is',props)
  // }

  // UNSAFE_componentWillReceiveProps(props){
  //   console.log('PROPS is', props)
  // }

  // static getDerivedStateFromProps() {
  //   console.log('HERE', this.props)
  // }

  render() {
    return (
      <div>{this.renderOpinions()}</div>
    )
  }
}

const mapStateToProps = state => ({
  opinions: state.opinions
})

const mapDispatchToProps = dispatch => ({
  getOpinions: () => {
    console.log('DISPATCHING OPINIONS')
    return dispatch(getOpinions())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionList)
