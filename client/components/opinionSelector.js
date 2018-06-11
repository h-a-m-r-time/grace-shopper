import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
  getFeelings,
  getThings,
  createFeeling,
  createThing,
  addNewOpinion,
  postCart,
} from '../store'
import Button from '@material-ui/core/Button'
import IntegrationAutosuggest from './OpinionSelectorAutoSuggest'
import CategoryRadioButtons from './opinionSelectorCategory'
import Card from './card'
import StatementMaker from '../utilities/statement-maker'

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

  onSubmit = async evt => {
    evt.preventDefault()
    ///need to push data to store and maybe redirect to cart? tbd
    //need both feeling and thing to be filled out before
    try {
      if (this.state.feeling && this.state.thing) {
        //i think we could use find here to not have the array lookup
        let feelObj = this.props.feelings.filter(feeling => {
          return feeling.name === this.state.feeling
        })[0]
        let thingObj = this.props.things.filter(thing => {
          return thing.name === this.state.thing
        })[0]
        if (!feelObj) {
          //if the feeling wasn't already created we need to create one
          feelObj = await this.props.createFeeling({
            name: this.state.feeling,
            category: this.state.category,
          })
        }
        if (!thingObj) {
          //if the thing wasn't already created we need to create one
          thingObj = await this.props.createThing({ name: this.state.thing })
        }

        //iterate through the opinions and check if the state's thing and feeling id's match any of the opinions before the following line executies
        //if it does match, set the opinion object to the one it matches
        //not working because the awaits aren't holding up the logic
        const opinion = await this.props.addNewOpinion({
          statement: StatementMaker.createStatement(this.state.feeling, this.state.thing, this.state.category),
          feelingId: feelObj.id,
          thingId: thingObj.id,
        })
        await this.props.postCart({
          opinionId: opinion.id,
          userId: this.props.userId,
          amount: 0.0,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <IntegrationAutosuggest
            value={this.state.feeling}
            onChangeFunc={this.onChange}
            placeHolder={StatementMaker.defaultFeeling(this.state.category)}
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
            <Card
              statement={StatementMaker.createStatement(
                this.state.feeling,
                this.state.thing
              )}
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
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
    userId: state.user.id,
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
    createFeeling: obj => {
      return dispatch(createFeeling(obj))
    },
    createThing: obj => {
      return dispatch(createThing(obj))
    },
    addNewOpinion: obj => {
      return dispatch(addNewOpinion(obj))
    },
    postCart: obj => {
      dispatch(postCart(obj))
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionSelector)
