import React, { Component } from 'react'

export default class Opinion extends Component {

  renderOpinion() {
    if (this.props.opinion.category === 'verb') {
      return ('I', this.props.opinion.statement)
    } else {
      return (this.props.opinion.statement)
    }
  }

  render(){
    return (
      <div>
        <h2>{this.renderOpinion()}</h2>
      </div>
    )
  }

}
