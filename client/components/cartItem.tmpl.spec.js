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
    it('renders a delete button', () => {
        const wrapper = setup()
        const deleteButton = wrapper.find('.jst_delete')
        expect(deleteButton.length).to.equal(1)
    })
    it('calls a delete handler on delete button click', () => {
        const props = {
            handleDelete: () => {}
        }
        const sneaky = spy(props, 'handleDelete')
        const wrapper = setup(props)
        const deleteButton = wrapper.find('.jst_delete')
        deleteButton.simulate('click', '1')
        expect(sneaky.callCount).to.equal(1)
    })
})
