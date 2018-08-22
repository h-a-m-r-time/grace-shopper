import { expect } from 'chai'
import React from 'react'
import { MemoryRouter } from 'react-router'
import { shallow } from 'enzyme'
import { Navbar as Nav } from './navbar'

/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...props }
    return shallow(<MemoryRouter><Nav { ...setupProps } /></MemoryRouter>)
}

describe('Navbar', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('renders home and cart information when logged in', () => {
        const wrapper = setup({isLoggedIn: true})
        expect(wrapper.html()).to.contain('Home')
        expect(wrapper.html()).to.contain('Cart')
    })
    it('renders login and signup information when not logged in', () => {
        const wrapper = setup()
        expect(wrapper.html()).to.contain('Login')
        expect(wrapper.html()).to.contain('Sign Up')
    })
})
