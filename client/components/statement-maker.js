import React, { Component } from 'react'

export default class StatementMaker extends Component {
  descriptionStatement() {
    if (this.props.thing !== '' && this.props.feeling !== '') {
      return 'I think/feel something about something'
    } else if (this.props.thing !== '') {
      return `I think/feel something about ${this.props.thing}`
    } else if (this.props.feeling !== '') {
      return `I ${this.props.feeling} something`
    } else {
      return `I ${this.props.feeling} ${this.props.thing}`
    }
  }

  verbStatement() {
    if (this.props.thing !== '' && this.props.feeling !== '') {
      return 'Something is described'
    } else if (this.props.thing !== '') {
      return `I think/feel something about ${this.props.thing}`
    } else if (this.props.feeling !== '') {
      return `I ${this.props.feeling} something`
    } else {
      return `I ${this.props.feeling} ${this.props.thing}`
    }
  }

  createStatement() {
    if (this.props.category === 'verb') {
      return this.descriptionStatement()
    } else {
      return this.verbStatement()
    }
  }

  render() {
    return <div>{this.createStatement()}</div>
  }
}
