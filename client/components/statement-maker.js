import React from 'react'
// import { connect } from 'react-redux'

import Card from './card'

export default function StatementMaker (props) {
  // constructor(props) {
  //   super(props)

    // this.descriptionStatement = this.descriptionStatement.bind(this)
    // this.verbStatement = this.verbStatement.bind(this)
    // this.createStatement = this.createStatement.bind(this)

  // }

  // presTenseVerb(thing){
  //   if (thing){
  //     if (thing[thing.length - 1] === 's'){
  //       return 'are'
  //     } else {
  //       return 'is'
  //     }
  //   }
  // }

  // descriptionStatement(thing, feeling) {
  //   // if (!this.props.thing && !this.props.feeling) {
  //   if (!thing && !feeling){
  //     return  'Something is described'
  //   } else if (thing && !feeling) {
  //     return `${thing} ${this.presTenseVerb(thing)} described`
  //   } else if (!thing && feeling) {
  //     return `Something ${feeling}`
  //   } else {
  //     return `${thing} ${this.presTenseVerb()} ${feeling} `
  //   }
  // }

  // verbStatement(feeling, thing) {
  //   // if (!this.props.feeling && !this.props.thing) {
  //     if (!feeling && !thing){
  //     return 'believe/feel/think something about something'
  //   } else if (!feeling && thing) {
  //     return `believe/feel/think something about ${thing}`
  //   } else if (feeling && !thing) {
  //     return `${feeling} something`
  //   } else {
  //     return `${feeling} ${thing}`
  //   }
  // }

  // createStatement(feeling, thing) {
  //   if (this.props.category === 'verb') {
  //     return this.verbStatement(feeling, thing)
  //   } else {
  //     return this.descriptionStatement(feeling, thing)
  //   }
  // }

  // componentDidMount() {
  //   this.createStatement()
  // }

  // render() {

    return (
    <div>
      <Card statement={props.statement} />
    </div>
    )
  // }
}
