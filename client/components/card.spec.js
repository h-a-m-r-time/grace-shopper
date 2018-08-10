import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { SimpleCard } from './card'

const defaultProps = {
    classes: {
        card: 'card',
        bullet: 'bullet',
        title: 'title',
        pos: 'pos'
    },
    category: 'test',
    statement: 'test'
}
/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<SimpleCard { ...setupProps } />)
}

describe('SimpleCard React Component', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
})
