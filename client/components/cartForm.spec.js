import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
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
})
