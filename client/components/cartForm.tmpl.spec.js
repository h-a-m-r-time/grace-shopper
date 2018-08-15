import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import CartForm from './cartForm.tmpl'

/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...props }
    return shallow(<CartForm { ...setupProps } />)
}

describe('cart template', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('renders a cartItem for each item', () => {
        const props = {cart: [{id: 1}, {id: 2}, {id: 3}]}
        const wrapper = setup(props)
        expect(wrapper.find('CartItem').length).to.equal(3)
    })
    it('display amount', () => {
        const props = {amount: 534534}
        const wrapper = setup(props)
        expect(wrapper.html()).to.contain(props.amount)
    })
    it('calls a submit function from props when submit', () => {
        const props = {handleSubmit: () => {}}
        const sneaky = spy(props, 'handleSubmit')
        const wrapper = setup(props)
        wrapper.simulate('submit')
        expect(sneaky.callCount).to.equal(1)
    })
})
