import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import { OpinionList } from './index'
import opinionList from './opinion-list'

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
})

class ListGenerator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      displayOrder: 'myOpinion',
    }
  }
  changeDisplay = evt => {
    if (evt.currentTarget.name !== this.state.displayOrder) {
      this.setState({ displayOrder: evt.currentTarget.name })
    }
  }
  render() {
    const { classes } = this.props
    return (
      <div>
        <Button
          variant="contained"
          color={
            this.state.displayOrder === 'myOpinions' ? 'primary' : 'default'
          }
          className={classes.button}
          name="myOpinions"
          onClick={this.changeDisplay}
        >
          My Opinions
        </Button>

        <Button
          variant="contained"
          color={
            this.state.displayOrder === 'topOpinions' ? 'primary' : 'default'
          }
          className={classes.button}
          name="topOpinions"
          onClick={this.changeDisplay}
        >
          Top Opinions
        </Button>
        <Button
          variant="contained"
          color={
            this.state.displayOrder === 'newOpinions' ? 'primary' : 'default'
          }
          className={classes.button}
          name="newOpinions"
          onClick={this.changeDisplay}
        >
          New Opinions
        </Button>
        <Button
          variant="contained"
          color={
            this.state.displayOrder === 'topPaidOpinions'
              ? 'primary'
              : 'default'
          }
          className={classes.button}
          name="topPaidOpinions"
          onClick={this.changeDisplay}
        >
          Top Paid Opinions
        </Button>
        <OpinionList displayOrder={this.state.displayOrder} />
      </div>
    )
  }
}

ListGenerator.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ListGenerator)
