import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeelings } from '../store/feeling'
import { getThings } from '../store/thing'
import Button from '@material-ui/core/Button'
import IntegrationReactSelect from './OpinionSelectorIntegration'
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

  componentDidUpdate() {

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
  }

  render() {
    console.log('PROPS',this.props)
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <IntegrationReactSelect
            value={this.state.feeling}
            onChangeFunc={this.onChange}
            placeHolder="singular verb"
            optionName="feeling"
            suggestions={this.props.feelingSuggestion}
          />
          <IntegrationReactSelect
            value={this.state.thing}
            onChangeFunc={this.onChange}
            placeHolder="opinion subject"
            optionName="thing"
            suggestions={this.props.thingSuggestion}
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
    feelingSuggestion = state.feelings
    .filter(feeling => feeling.category !== state.category)
    .map(feeling => {
      console.log('category is', state.category)
      return {
        value: feeling.name,
        label: feeling.name,
      }
    })
  }

  if (state.things.length) {
    thingSuggestion = state.things
    .map(thing => {
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
