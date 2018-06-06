import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getFeelings } from '../store/feeling'
import { getThings } from '../store/thing'

class OpinionSelector extends Component {
  constructor(props) {
    super(props)
    this.state = {
      feeling: '',
      thing: '',
    }
  }
  componentDidMount() {
    this.props.getFeelings()
    this.props.getThings()
  }

  onFeelingChange = evt => {
    this.setState({ feeling: evt.target.value })
  }

  onThingChange = evt => {
    this.setState({ thing: evt.target.value })
  }

  onSubmit = evt => {
    evt.preventDefault()
    ///need to push data to store and maybe redirect to cart? tbd
    //can se
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div>I</div>
        <form onSubmit={this.onSubmit}>
          <label>Select Feeling</label>
          <input
            type="text"
            list="feeling"
            onChange={this.onFeelingChange}
            placeholder="Select Feeling"
          />
          <datalist id="feeling">
            {this.props.feelings.length ? (
              this.props.feelings.map(feeling => (
                <option key={feeling.id}>{feeling.name}</option>
              ))
            ) : (
              <option>No feelings in database</option>
            )}
          </datalist>
          <label>Select Thing</label>
          <input
            type="text"
            list="thing"
            onChange={this.onThingChange}
            placeholder="Select Thing"
          />
          <datalist id="thing">
            {this.props.things.length ? (
              this.props.things.map(thing => (
                <option value={thing.name} key={thing.id}>
                  {thing.name}
                </option>
              ))
            ) : (
              <option value="new">No feelings in database</option>
            )}
          </datalist>
          <div>
            <button type="submit">Add Opinion to Cart</button>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = (state, ownprops) => {
  return {
    feelings: state.feelings,
    things: state.things,
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
