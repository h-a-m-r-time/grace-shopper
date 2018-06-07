import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeelings } from '../store/feeling'
import { getThings } from '../store/thing'
import Button from '@material-ui/core/Button'
import IntegrationReactSelect from './OpinionSelectorIntegration'

class OpinionSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feeling: '',
      thing: '',
      category: 'verb',
    }
  }
  componentDidMount() {
    this.props.getFeelings()
    this.props.getThings()
  }

  onChange = (name, value) => {
    this.setState({ [name]: value })
  }

  onSubmit = evt => {
    evt.preventDefault()
    ///need to push data to store and maybe redirect to cart? tbd
    //can se
  }
  // value,
  // onChangeFunc,
  // placeholder,
  // optionName,
  // suggestions,
  render() {
    return (
      <div className="contentWrap">
        <div>I</div>
        <form onSubmit={this.onSubmit}>
          <IntegrationReactSelect
            value={this.state.feeling}
            onChangeFunc={this.onChange}
            placeHolder="how you feeling?"
            optionName="feeling"
            suggestions={this.props.feelingSuggestion}
          />>
          <IntegrationReactSelect
            value={this.state.thing}
            onChangeFunc={this.onChange}
            placeHolder="Thing you feel this towards?"
            optionName="thing"
            suggestions={this.props.thingSuggestion}
          />>
          <div>
            <Button variant="contained" color="primary" type="submit">
              Add Opinion to Cart
            </Button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  let feelingSuggestion = []
  let thingSuggestion = []
  if (state.feelings.length) {
    feelingSuggestion = state.feelings.map(feeling => {
      return {
        value: feeling.name,
        label: feeling.name,
      }
    })
  }

  if (state.things.length) {
    thingSuggestion = state.things.map(thing => {
      return {
        value: thing.name,
        label: thing.name,
      }
    })
  }

  return {
    feelings: state.feelings,
    things: state.things,
    feelingSuggestion: feelingSuggestion,
    thingSuggestion: thingSuggestion,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFeelings: () => {
      dispatch(getFeelings())
    },
    getThings: () => {
      dispatch(getThings())
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionSelector)
