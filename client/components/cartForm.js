import React, { Component } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {fetchCart, deleteOpinion} from '../store/currentCart'
import {me} from '../store/user'
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

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'dodgerblue',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);


class CartForm extends Component {

  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount () {
    this.props.getUser()
    this.props.getUserCart(this.props.user.id)
  }

  handleChange(event) {
    // console.log("What we're typing: ", event.target.value)
    // this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.value)

  }

  handleSubmit(event) {
    //information to be submitted to checkout

    // event.preventDefault()
    // const cart = {
    //   opinion: event.target.opinion.value,
    //   price: event.target.price.value,
    // }

  }

  handleDelete = (itemId) => {
    this.props.deleteItem(itemId)
  }

  render() {
    console.log(this.props)
    return (
      <form onSubmit={this.handleSubmit}>
      <Paper >
      <Table >
        <TableHead>
          <TableRow>
            <CustomTableCell>Opinion</CustomTableCell>
            <CustomTableCell>Price</CustomTableCell>
            <CustomTableCell />
            <CustomTableCell />
          </TableRow>
        </TableHead>
        <TableBody>
            {
              this.state.currentCart.map(item => (
                <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell><Input placeholder="What's It Worth?" /></TableCell>
                      <TableCell><Button variant="contained" color="secondary" type="submit" onClick={this.handleDelete(item.id)}><small>Delete</small></Button></TableCell>
                </TableRow>
              ))
            }
        </TableBody>
        <TableFooter>
          <TableRow>
          <TableCell />
          <TableCell />
          <TableCell />
          <TableCell>Total</TableCell>
          <TableCell><Button variant="contained" color="primary" type="submit"  ><small>Checkout</small></Button></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      </Paper>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  currentCart: state.currentCart,
  user: state.user
});

const mapDispatchToProps = (dispatch) => {
  return {
    getUserCart: (user) => dispatch(fetchCart(user)),
    getUser: () => dispatch(me()),
    deleteItem: (opinionId) => dispatch(deleteOpinion(opinionId))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(CartForm)



{/* <TableRow>
<TableCell>Opinion From Database</TableCell>
<TableCell><Input placeholder="What's It Worth?" /></TableCell>
<TableCell><Button variant="contained" color="secondary" type="submit"><small>Delete</small></Button></TableCell>
</TableRow>
<TableRow>
<TableCell>I love rice!</TableCell>
<TableCell><Input placeholder="What's It Worth?" /></TableCell>
<TableCell><Button variant="contained" color="secondary" type="submit"><small>Delete</small></Button></TableCell>
</TableRow>
<TableRow>
<TableCell>I hate pugs</TableCell>
<TableCell><Input placeholder="What's It Worth?" /></TableCell>
<TableCell><Button variant="contained" color="secondary" type="submit"><small>Delete</small></Button></TableCell>
</TableRow> */}

// {
//   this.props.defaultCart.map(opinion => (
//   <div>
//     <div>
//       {opinion}
//     </div>
//     <form onSubmit={this.handleSubmit} name={name}>
//       <div>
//         <label htmlFor="opinion"><small>Opinion</small></label>
//         <input name="opinion" type="text" />
//       </div>
//       <div>
//         <label htmlFor="price"><small>Price</small></label>
//         <input name="price" type="price" />
//       </div>
//       <div>

//         <button type="submit"><small>Checkout</small></button>
//       </div>
//       {error && error.response && <div> {error.response.data} </div>}
//     </form>
//   </div>
//   ))
// }

{/* <div>
<table>
  <tr>
    <th>Opinion</th>
    <th>Price</th>
  </tr>
</table>
  <form onSubmit={this.handleSubmit} name={name}>
    <div>
      <label htmlFor="opinion"><small>Opinion</small></label>

      <input name="opinion" type="text" placeholder="" />
    </div>
    <div>
      <label htmlFor="price"><small>Price</small></label>
      <input name="price" type="price" placeholder="currentPrice" />
    </div>
    <div>

      <Button variant="contained" color="primary" type="submit"><small>Checkout</small></Button>
    </div>
    {error && error.response && <div> {error.response.data} </div>}
  </form>
</div> */}