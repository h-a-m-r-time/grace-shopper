import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter, Paper} from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Payment, CartItem } from './'

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'dodgerblue',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell)

/**
 * Renders the cart form
 * @param {object} props - React props.
 * @returns {JSX.Element} - Rendered component
 */
export default function CartForm (props) {
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
                      <CartItem key={item.id} item={item} handleChange={props.handleChange} handleDelete={props.handleDelete} />
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
