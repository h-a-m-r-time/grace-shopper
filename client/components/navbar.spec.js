import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { Navbar as Nav } from './navbar'

/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...props }
    return shallow(<Nav { ...setupProps } />)
}

describe('Navbar', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
})
