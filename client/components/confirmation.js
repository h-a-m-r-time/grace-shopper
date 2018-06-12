import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, withStyles } from '@material-ui/core'
import { TransactionReceipt } from './'
import { getTransactions } from '../store'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
})

class Confirmation extends Component {
  renderTransactions() {
    if (this.props.transactions && this.props.transactions.length) {
      return this.props.transactions.map(transaction => {
          if(transaction.userId === this.props.userId){
              return <TransactionReceipt key={transaction.id} transaction={transaction} />
          }
      })
    } else {
      return <TableRow><TableCell>'We can not find your transactions, the pyramid is collapsing'</TableCell></TableRow>
    }
  }

  componentDidMount() {
    this.props.getTransactions()
  }

  render() {
    const { classes } = this.props
    return (
      <Paper className={classes.root}>
        <h3>Your Certified Ego</h3>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Opinion</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Date Purchased</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {this.renderTransactions()}
            </TableBody>
        </Table>

      </Paper>
    )
  }
}

const mapStateToProps = state => ({
  transactions: state.transaction,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getTransactions: () => {
    return dispatch(getTransactions())
  },
})

Confirmation.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(Confirmation))
