import React from 'react'
import Button from '@material-ui/core/Button'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import Paper from '@material-ui/core/Paper'
import Input from '@material-ui/core/Input'
import { withStyles } from '@material-ui/core/styles'
import Payment from './payment'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'dodgerblue',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

export default function TransactionReceipt (props) {
    return (
        <form onSubmit={props.handleSubmit}>
          <Paper>
            <Table>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Opinion</CustomTableCell>
                  <CustomTableCell>Price</CustomTableCell>
                  <CustomTableCell />
                  <CustomTableCell />
                  <CustomTableCell />
                  <CustomTableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {props &&
                  props.cart &&
                  props.cart[0] &&
                  props.cart[0].id &&
                  props.cart.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.opinion ? item.opinion.statement : 'Dat New New'}</TableCell>
                      <TableCell>
                      <TableCell><Input placeholder="What Is It Worth?" value={item.amount} onChange={ev => {props.handleChange(item, ev)}} /></TableCell>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          onClick={() => props.handleDelete(item.id)}
                        >
                          <small>Delete</small>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell />
                  <TableCell />
                  <TableCell />
                  <TableCell>Total</TableCell>
                  <TableCell>$ {props.amount}</TableCell>
                  <TableCell>
                    <Payment
                      amount={props.amount}
                      description={props.description}
                      transactions={props.cart}
                    />
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </Paper>
        </form>
    )
}
