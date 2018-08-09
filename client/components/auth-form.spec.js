import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { AuthForm } from './auth-form'

/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...props }
    return shallow(<AuthForm { ...setupProps } />)
}

describe('Auth Form React Component', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('handles submit with provided prop', () => {
        const props = {handleSubmit: function(){}}
        const sneaky = spy(props, 'handleSubmit')
        const wrapper = setup(props)
        const form = wrapper.find('form')
        form.simulate('submit')
        expect(sneaky.callCount).to.equal(1)
    })
    it('renders email input', () => {
        const wrapper = setup()
        const email = wrapper.find('#email')
        expect(email.length).to.equal(1)
    })
    it('renders password input', () => {
        const wrapper = setup()
        const password = wrapper.find('#password')
        expect(password.length).to.equal(1)
    })
})
