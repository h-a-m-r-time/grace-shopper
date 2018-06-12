import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchCart, removeItem } from '../store/cart'
import { me } from '../store/user'
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

class CartForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      amount: 0,
      description: '',
        cart: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }


  async componentDidMount () {
    this.props.getUser()
    await this.props.getUserCart(this.props.user.id)
    this.setState({cart: this.props.cart})
  }

  async handleChange(item, ev) {
    // console.log("What we're typing: ", event.target.value)
    // this.setState({ [event.target.name]: event.target.value });
    //console.log(event.target.value, amount)
    let priceChangeCart = [...this.state.cart]
    let price = 0;
    for (let i = 0; i < priceChangeCart.length; i++) {
        if(priceChangeCart[i].id === item.id){
            priceChangeCart[i].amount = ev.target.value;
            await this.setState({
                ...this.state,
                cart: priceChangeCart
            })
        }
        price += +priceChangeCart[i].amount
    }
    console.log(price)
    this.setState({
      amount: price
    })
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  handleDelete = itemId => {
    this.props.deleteItem(itemId)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
              {this.props &&
                this.props.cart &&
                this.props.cart[0] &&
                this.props.cart[0].id &&
                this.props.cart.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.opinion.statement}</TableCell>
                    <TableCell>
                    <TableCell><Input placeholder="What's It Worth?" value={item.amount} onChange={ev => {this.handleChange(item, ev)}} /></TableCell>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        onClick={() => this.handleDelete(item.id)}
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
                <TableCell>$ {this.state.amount}</TableCell>
                <TableCell>
                  <Payment
                    amount={this.state.amount}
                    description={this.state.description}
                    transactions={this.state.cart}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Paper>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  user: state.user,
})

const mapDispatchToProps = dispatch => {
  return {
    getUserCart: user => dispatch(fetchCart(user)),
    getUser: () => dispatch(me()),
    deleteItem: opinionId => dispatch(removeItem(opinionId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CartForm)
