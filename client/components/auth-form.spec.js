import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { mount, shallow } from 'enzyme'
import { AuthForm } from './auth-form'

const defaultProps = {

}
/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
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
        const email = wrapper.find('#email')
        const password = wrapper.find('#password')
        email.value = 'test@test.com'
        password.value = 'test@test.com'
        console.log("FORMIN", form.debug())
        form.simulate('submit')
        console.log("SNEAKY", sneaky.args)
        expect(sneaky.callCount).to.equal(1)
    })
})
