import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow, mount } from 'enzyme'
import { CartForm } from './cartForm'

const defaultProps = {
    getUser: () => {

    },
    user: {},
    getUserCart: () => {

    }
}
/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<CartForm { ...setupProps } />)
}

describe('Cart Form component', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('calls appropriate functions on mount', () => {
        const props = {
            getUser: () => {},
            getUserCart: () => {}
        }
        const userWatch = spy(props, 'getUser')
        const cartWatch = spy(props, 'getUserCart')
        const wrapper = setup(props)
        expect(userWatch.callCount).to.equal(1)
        expect(cartWatch.callCount).to.equal(1)
    })
    it('invokes the deleteItem prop when handleDelete is triggered appropriately', () => {
        const props = {
            deleteItem: () => {},
        }
        const arg = '5'
        const sneaky = spy(props, 'deleteItem')
        const wrapper = setup(props)
        const instance = wrapper.instance()
        instance.handleDelete(arg)
        expect(sneaky.callCount).to.equal(1)
        expect(sneaky.args[0][0]).to.equal(arg)
    })
    it('updates cart amount price', async () => {
        const props = {
            cart: [{id: 5, amount: "0"}, {id: 14, amount: "0"}]
        }
        const wrapper = setup(props)
        const instance = wrapper.instance()
        instance.handleChange({id: 5}, {target: {value: "50"}})
        expect(wrapper.state('amount')).to.equal(50)
        instance.handleChange({id: 14}, {target: {value: "5"}})
        expect(wrapper.state('amount')).to.equal(55)
    })
})
