import React, { Component } from 'react'

export default class StatementMaker extends Component {
  constructor(props) {
    super(props)

    this.state = {
      statement: '',
    }
  }

  descriptionStatement() {
    console.log('description statement', this)
    if (this.props.thing !== '' && this.props.feeling !== '') {
      this.setState({ statement: 'I think/feel something about something' })
    } else if (this.props.thing !== '') {
      this.setState({
        statement: `I think/feel something about ${this.props.thing}`,
      })
    } else if (this.props.feeling !== '') {
      this.setState({ statement: `I ${this.props.feeling} something` })
    } else {
      this.setState({
        statement: `I ${this.props.feeling} ${this.props.thing}`,
      })
    }
  }

  verbStatement() {
    console.log('verbStatement', this)
    if (this.props.thing !== '' && this.props.feeling !== '') {
      this.setState({ statement:  'Something is described' })
    } else if (this.props.thing !== '') {
      this.setState({ statement:  `I think/feel something about ${this.props.thing}` })
    } else if (this.props.feeling !== '') {
      this.setState({ statement:  `I ${this.props.feeling} something` })
    } else {
      this.setState({ statement:  `I ${this.props.feeling} ${this.props.thing}` })
    }
  }

  createStatement() {
    console.log('createStatement', this)
    if (this.props.category === 'verb') {
      return this.verbStatement()
    } else {
      return this.descriptionStatement()
    }
  }

  componentDidMount() {
    console.log('CDM', this)
    this.createStatement()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('GDSFP', this)
    if (
      nextProps.thing !== prevState.thing &&
      nextProps.feeling !== prevState.feeling
    ) {
      return {
        thing: nextProps.thing,
        feeling: nextProps.feeling
      }
    }
    return null
  }

  // componentDidUpdate(){
  //   console.log('CDU')
  //   // this.createStatement()
  // }

  render() {
    return <div> {this.state.statement} </div>
  }
}
