import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { SimpleCard } from './card'
import Statement from '../utilities/statement-maker'

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
const setup = (props = {}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<SimpleCard { ...setupProps } />)
}

describe('SimpleCard React Component', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('displays statement', () => {
        const wrapper = setup()
        expect(wrapper.contains(defaultProps.statement)).to.equal(true)
    })
    it('calls utility functions appropriately', () => {
        const addOnWatch = spy(Statement, 'descriptionAddOn')
        const alterWatch = spy(Statement, 'alteredStatement')
        setup()
        expect(addOnWatch.callCount).to.equal(1)
        expect(alterWatch.callCount).to.equal(1)
        expect(addOnWatch.args[0][0]).to.equal(defaultProps.category)
        expect(alterWatch.args[0][0]).to.equal(defaultProps.statement)
    })
})
