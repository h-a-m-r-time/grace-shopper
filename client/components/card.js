import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Statement from '../utilities/statement-maker'

const styles = {
  card: {
    width: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    marginBottom: 16,
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}

/**
 * Class component used to display opinions on main page
 * @function SimpleCard
 * @param       {object} props React props
 * @return {JSX.Element} React object to render component
 */
export function SimpleCard(props) {
  const { classes } = props

  return (
    <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography className={classes.title} color="textSecondary">
            I, the Logged-In User,
          </Typography>
          <Typography variant="headline" component="h2">
            OFFICIALLY
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            (and definitively)
          </Typography>
          <Typography component="p">
          {Statement.descriptionAddOn(props.category)}
          <br />
          {Statement.alteredStatement(props.statement)}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Purchase</Button>
        </CardActions>
      </Card>
    </div>
  )
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(SimpleCard)
