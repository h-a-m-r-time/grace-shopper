import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import CartItem from './cartItem.tmpl'

const defaultProps = {
    item: {}
}
/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<CartItem { ...setupProps } />)
}

describe('cart item', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
})
