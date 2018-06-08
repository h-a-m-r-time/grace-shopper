import React, { Component } from 'react'
import { connect } from 'react-redux'

import Card from './card'

export default class StatementMaker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      statement: '',
    }

    this.descriptionStatement = this.descriptionStatement.bind(this)
    this.verbStatement = this.verbStatement.bind(this)
    this.createStatement = this.createStatement.bind(this)

  }

  presTenseVerb(){
    if (this.props.thing){
      if (this.props.thing[this.props.thing.length - 1] === 's'){
        return 'are'
      } else {
        return 'is'
      }
    }
  }

  descriptionStatement() {
    if (!this.props.thing && !this.props.feeling) {
      return  'Something is described'
    } else if (this.props.thing && !this.props.feeling) {
      return `${this.props.thing} ${this.presTenseVerb()} described`
    } else if (!this.props.thing && this.props.feeling) {
      return `Something ${this.props.feeling}`
    } else {
      return `${this.props.thing} ${this.presTenseVerb()} ${this.props.feeling} `
    }
  }

  verbStatement() {
    if (!this.props.feeling && !this.props.thing) {
      return 'believe/feel/think something about something'
    } else if (!this.props.feeling && this.props.thing) {
      return `believe/feel/think something about ${this.props.thing}`
    } else if (this.props.feeling && !this.props.thing) {
      return `${this.props.feeling} something`
    } else {
      return `${this.props.feeling} ${this.props.thing}`
    }
  }

  createStatement() {
    if (this.props.category === 'verb') {
      return this.verbStatement()
    } else {
      return this.descriptionStatement()
    }
  }

  componentDidMount() {
    this.createStatement()
  }

  render() {

    return (
    <div>
      <Card statement={this.createStatement()} />
    </div>
    )
  }
}
