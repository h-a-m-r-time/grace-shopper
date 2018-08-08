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

/**
 * Class for all confirmed purchased opinions
 * @extends Component
 */
class Confirmation extends Component {

  /**
   * Logic to either render out transactions as Table rows or a single row with an empty message
   * @return   {JSX.Element} Element cotaining body of transactions table
   */
  renderTransactions() {
    if (this.props.transactions && this.props.transactions.length) {
      return this.props.transactions.map(transaction => {
          if (transaction.userId === this.props.userId){
              return <TransactionReceipt key={transaction.id} transaction={transaction} />
          }
      })
    } else {
      return <TableRow><TableCell>'We can not find your transactions, the pyramid is collapsing'</TableCell></TableRow>
    }
  }

  /**
   * makes a call to populate transactions into store when component mounts
   * @function componentDidMount
   */
  componentDidMount() {
    this.props.getTransactions()
  }

  /**
   * renders confirmation view
   * @return {JSX.Element}
   */
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

/**
 * Provides necessary state from store to component's props
 * @param    {object} state object from redux store
 * @return   {object} props for component
 */
const mapStateToProps = state => ({
  transactions: state.transaction,
  userId: state.user.id
})

/**
 * Provides functions that utilize dispatch to component's props
 * @param    {function} dispatch dispatches actions to redux store
 * @return   {object} provides functions that utilize dispatch as component's props
 */
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
