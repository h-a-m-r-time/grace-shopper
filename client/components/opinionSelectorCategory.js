import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormControl from '@material-ui/core/FormControl'
import FormLabel from '@material-ui/core/FormLabel'

const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
})

class CategoryRadioButtons extends React.Component {
  handleChange = event => {
    this.props.onChangeFunc('category', event.target.value)
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <FormControl
          component="fieldset"
          required
          className={classes.formControl}
        >
          <FormLabel component="legend">Category</FormLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            className={classes.group}
            value={this.props.value}
            onChange={this.handleChange}
          >
            <FormControlLabel
              value="verb"
              control={<Radio color="primary" />}
              label="Verb"
            />
            <FormControlLabel
              value="description"
              control={<Radio color="primary" />}
              label="Description"
            />
          </RadioGroup>
        </FormControl>
      </div>
    )
  }
}

CategoryRadioButtons.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CategoryRadioButtons)
