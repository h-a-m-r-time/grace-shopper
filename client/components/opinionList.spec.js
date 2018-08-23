import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { OpinionList } from './opinionList'

const defaultProps = {
    getOpinions: () => {},
    opinions: []
}
/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = ( props = {} ) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<OpinionList { ...setupProps } />)
}

describe('OpinionList', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('calls appropriate methods on mount', () => {
        const sneaky = spy(defaultProps, 'getOpinions')
        setup()
        expect(sneaky.callCount).to.equal(1)
    })
})
