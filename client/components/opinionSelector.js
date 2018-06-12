import React, { Component } from 'react'
import { connect } from 'react-redux'
//lets talk about prettier configurating becaues if they're single words i think one line is nicer
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
import { withRouter } from 'react-router-dom'
import Card from './card'
import StatementMaker from '../utilities/statement-maker'

class OpinionSelector extends Component {
  constructor(props) {
    super(props)

    this.state = {
      feeling: '',
      thing: '',
      category: 'verb',
      currentOpinion: {}
    }
  }

  componentDidMount() {
    this.props.getFeelings()
    this.props.getThings()
  }

  correctSuggestions(suggestions) {
    return suggestions
    .filter(suggestion => suggestion.category === this.state.category)
  }
  //I think these makeshift render methods are a sign that we are doing too much in a single component
  //I'm not totally convinced it's not a sligth antipattern
  //if a piece of a render can be cleanly broken out to a function, it maybe ought to be broken out to it's own stateless component
  formRenderOrder() {
     const feelingComp = (<IntegrationAutosuggest
      value={this.state.feeling}
      onChangeFunc={this.onChange}
      placeHolder={StatementMaker.defaultFeeling(this.state.category)}
      optionName="feeling"
      suggestionsProps={this.correctSuggestions(this.props.feelingSuggestions)}
      key={1}
    />)

    const thingComp = (<IntegrationAutosuggest
      value={this.state.thing}
      onChangeFunc={this.onChange}
      placeHolder="opinion subject"
      optionName="thing"
      suggestionsProps={this.correctSuggestions(this.props.thingSuggestions)}
      key={2}
    />)

    if (this.state.category === 'verb'){
      return [<div className="description-i" key={0}>I    </div>, feelingComp, thingComp]
    } else {
      return [thingComp, feelingComp]
    }

  }

  onChange = async (name, value) => {
    //we need this await so we check against the current state instead of
    //checking the logi to which name we have and then using teh value and looking at state for the other
    await this.setState({ [name]: value })
    //toogles the  category state if feeling exists
    if (name === 'feeling') {
      const feelObj = this.props.feelings.filter(feeling => {
        return feeling.name === value
      })[0]
      if (feelObj) {
        this.setState({ category: feelObj.category })
      }
    }
    this.props.opinions.map(op => {
        //check that we have matching feelings and thing on a created opinion, and set the opinion
        if(op.feeling.name === this.state.feeling && op.thing.name === this.state.thing){
            this.setState({currentOpinion: op})
            //unset it whenever there is one and one of the elements changed
        } else if(this.state.currentOpinion && this.state.currentOpinion.id){
            this.setState({currentOpinion: {}})
        }
    })
  }

  onSubmit = async evt => {
    evt.preventDefault()
    ///need to push data to store and maybe redirect to cart? tbd
    //need both feeling and thing to be filled out before
    try {
      if (this.state.feeling && this.state.thing) {
        //if selectedOpinionid exists, the user has submitted a created idea so
        if(this.state.currentOpinion && this.state.currentOpinion.id){
            //may want to await this so we don't navigate to the cart until it's ready with new items?
            this.props.postCart({
              opinionId: this.state.currentOpinion.id,
              userId: this.props.userId,
              amount: 0.0,
            })
            //right now it won't show the newest add in cart
            //we either have to navigate from teh router or return a promise or have a onreceiveprops in the cart
            this.props.history.push("/cart")
        } else {
            //setup the bare object, check if the feelings and things were in the prop arrays
            //this eventually will not have to check if the feelings and things were in scope
            //because onchange we'll store a current thing and current feeling for details... maybe, i don't know, just a thought
            let opinionObj = {
                statement: StatementMaker.createStatement(this.state.feeling, this.state.thing, this.state.category),
                category: this.state.category,
                userId: this.props.userId
            }
            let feelObj = this.props.feelings.find(feeling => {
              return feeling.name === this.state.feeling
            })
            let thingObj = this.props.things.find(thing => {
              return thing.name === this.state.thing
            })
            feelObj ? opinionObj.feelingId = feelObj.id : opinionObj.feeling = this.state.feeling
            thingObj ? opinionObj.thingId = thingObj.id : opinionObj.thing = this.state.thing
            this.props.addNewOpinion(opinionObj)
            //not sure if navigation can or should be in a thunk
            this.props.history.push("/cart")
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          {this.formRenderOrder()}
          {this.state.currentOpinion && this.state.currentOpinion.id && (
              <div>
                Opinion created at: <span>{this.state.currentOpinion.createdAt}</span>
              </div>
          )}
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
              category={this.state.category}
              statement={StatementMaker.createStatement(
                this.state.feeling,
                this.state.thing,
                this.state.category
              )}
            />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  let feelingSuggestions = []
  let thingSuggestions = []
  if (state.feelings.length) {
    feelingSuggestions = state.feelings.map(feeling => {
      return {
        category: feeling.category,
        value: feeling.name,
        label: feeling.name,
      }
    })
  }

  if (state.things.length) {
    thingSuggestions = state.things.map(thing => {
      return {
        value: thing.name,
        label: thing.name,
      }
    })
  }

  return {
    feelings: state.feelings,
    things: state.things,
    opinions: state.opinionReducer.opinions,
    feelingSuggestions: feelingSuggestions,
    thingSuggestions: thingSuggestions,
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
    //might be overkill, might already have them ready in store
    getOpinions: () => {
      dispatch(getOpinoins)
    },
    addNewOpinion: obj => {
      return dispatch(addNewOpinion(obj))
    },
    postCart: obj => {
      dispatch(postCart(obj))
    },
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(OpinionSelector))
