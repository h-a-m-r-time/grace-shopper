import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeelings } from '../store/feeling'
import { getThings } from '../store/thing'
import Button from '@material-ui/core/Button'
import IntegrationAutosuggest from './OpinionSelectorAutoSuggest'
import CategoryRadioButtons from './opinionSelectorCategory'
import StatementMaker from './statement-maker'

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
    //toogles the  category state if feeling exists
    if (name === 'feeling') {
      const feelObj = this.props.feelings.filter(feeling => {
        return feeling.name === value
      })[0]
      if (feelObj) {
        this.setState({ category: feelObj.category })
      }
    }
  }

  onSubmit = evt => {
    evt.preventDefault()
    ///need to push data to store and maybe redirect to cart? tbd
    //need both feeling and thing to be filled out before
    if (this.state.feeling && this.state.thing) {
      const feelObj = this.props.feelings.filter(feeling => {
        return feeling.name === this.state.feeling
      })[0]
      console.log(feelObj)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <IntegrationAutosuggest
            value={this.state.feeling}
            onChangeFunc={this.onChange}
            placeHolder="singular verb"
            optionName="feeling"
            suggestionsProps={this.props.feelingSuggestion}
          />
          <IntegrationAutosuggest
            value={this.state.thing}
            onChangeFunc={this.onChange}
            placeHolder="opinion subject"
            optionName="thing"
            suggestionsProps={this.props.thingSuggestion}
          />
          <CategoryRadioButtons
            onChangeFunc={this.onChange}
            value={this.state.category}
          />
          <div>
            <Button variant="contained" color="primary" type="submit">
              Add Opinion to Cart
            </Button>
          </div>
          <div>
            <StatementMaker
            thing={this.state.thing}
            feeling={this.state.feeling}
            category={this.state.category} />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
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
    category: state.category,
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
