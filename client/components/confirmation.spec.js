import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Confirmation } from './confirmation'

const adapter = new Adapter()
enzyme.configure({ adapter})



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
    getTransactions: function(){() => {
        getTransactions += 1;
    }}
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
        const wrapper = setup()

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
