import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeelings, getThings, createFeeling, createThing, addNewOpinion, postCart } from '../store'
import Button from '@material-ui/core/Button'
import IntegrationAutosuggest from './OpinionSelectorAutoSuggest'
import CategoryRadioButtons from './opinionSelectorCategory'

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
    if (this.state.feeling && this.state.thing) {
        //i think we could use find here to not have the array lookup
        let feelObj = this.props.feelings.filter(feeling => {
          return feeling.name === this.state.feeling
        })[0]
        let thingObj = this.props.things.filter(thing => {
          return thing.name === this.state.thing
        })[0]
      console.log(feelObj)
      if(!feelObj){
          console.log("feelOBjyo", feelObj)
          //if the feeling wasn't already created we need to create one
          //these are succesuflly hitting api to create stuff but not waiting, can't figure why
          feelObj = await this.props.createFeeling({name: this.state.feeling, category: this.state.category})
          console.log("feelOBjyI<Po", feelObj)
      }
      if(!thingObj){
          //if the thing wasn't already created we need to create one
          //these are succesuflly hitting api to create stuff but not waiting, can't figure why
          thingObj = await this.props.createThing({name: this.state.thing})
      }
      console.log("feelOBjyo", feelObj, thingObj)

      //iterate through the opinions and check if the state's thing and feeling id's match any of the opinions before the following line executies
      //if it does match, set the opinion object to the one it matches
      //not working because the awaits aren't holding up the logic
      const opinion = await this.props.addNewOpinion({statement: `i ${this.state.feeling} on ${this.state.thing} or something`, feelingId: feelObj.id, thingId: thingObj.id})
      const cartObj = await this.props.postCart({opinionId: opinion.id, userId: this.props.userId, amount: 0.0})

    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <IntegrationAutosuggest
            value={this.state.feeling}
            onChangeFunc={this.onChange}
            placeHolder="how you feeling?"
            optionName="feeling"
            suggestionsProps={this.props.feelingSuggestion}
          />
          <IntegrationAutosuggest
            value={this.state.thing}
            onChangeFunc={this.onChange}
            placeHolder="Thing you feel this towards?"
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
    userId: state.user.id
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
    createFeeling: (obj) => {
        console.log('about to dispatch', obj)
        dispatch(createFeeling(obj))
    },
    createThing: (obj) => {
        dispatch(createThing(obj))
    },
    addNewOpinion: (obj) => {
        dispatch(addNewOpinion(obj))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionSelector)
