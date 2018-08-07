/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TransactionReceipt from './transactionReceipt'

const adapter = new Adapter()
enzyme.configure({ adapter })

const defaultProps = {transaction: {
    opinion: {statement: 'test'},
    amount: '0',
    updatedAt: '2018-07-23 14:59:39.525-04'}
}

/**
 * sets up the shallow object for testing
 * @function  setup
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = () => {
    return shallow(<TransactionReceipt {...defaultProps} />)
}
describe('Transaction Receipt React Component', () => {
  it('renders succesfully', () => {
      const wrapper = setup()
      expect(wrapper.length).to.equal(1)
  })
  it('displays statement, amount, and date information', () => {
    const wrapper = setup()
    expect(wrapper.find('.statement').text()).to.contain(defaultProps.transaction.opinion.statement)
    expect(wrapper.find('.amount').text()).to.contain(defaultProps.transaction.amount)
    expect(wrapper.find('.date').text()).to.contain(new Date(defaultProps.transaction.updatedAt).toLocaleDateString())
  })
})
