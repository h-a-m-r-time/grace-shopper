import { expect } from 'chai'
import { spy } from 'sinon'
import React from 'react'
import { shallow } from 'enzyme'
import { Confirmation } from './confirmation'

const defaultProps = {
    transactions: [{
        amount: "2.66",
        createdAt: "2018-06-12T00:55:56.725Z",
        id: 5,
        opinionId: 3,
        purchased: true,
        updatedAt: "2018-06-12T00:55:56.751Z",
        userId: 1
    }],
    userId: 1,
    classes: {
        root: 'root',
        table: 'table',
    },
    /**
     * stub for necessary function in props
     */
    getTransactions: function(){}
}

/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<Confirmation { ...setupProps } />)
}

describe('Confiramtion React Component', () => {
    it('renders succesfully', () => {
        const wrapper = setup()
        expect(wrapper.length).to.equal(1)
    })
    it('displays message if no transactions are available', () => {
        const wrapper = setup({transactions: []})
        expect(wrapper.find('.jst_empty').length).to.equal(1)
    })
    it('displays message if current user has no transactions', () => {
        const wrapper = setup({userId: 2})
        expect(wrapper.find('.jst_empty').length).to.equal(1)
    })
    it('gets transactions when it mounts', () => {
        const props = {getTransactions: function(){}}
        const sneaky = spy(props, "getTransactions")
        const wrapper = setup(props)
        expect(sneaky.callCount).to.equal(1)
    })
    it('displays transactions from props', () => {
        const wrapper = setup({transactions: [{
            amount: "2.66",
            createdAt: "2018-06-12T00:55:56.725Z",
            id: 5,
            opinionId: 3,
            purchased: true,
            updatedAt: "2018-06-12T00:55:56.751Z",
            userId: 1
        }, {
            amount: "2.66",
            createdAt: "2018-06-12T00:55:56.725Z",
            id: 6,
            opinionId: 4,
            purchased: true,
            updatedAt: "2018-06-12T00:55:56.751Z",
            userId: 1
        }]})
        expect(wrapper.find('TransactionReceipt').length).to.equal(2)
    })
})
