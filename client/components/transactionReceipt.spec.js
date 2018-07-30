/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import TransactionReceipt from './transactionReceipt'
import { createShallow } from '@material-ui/core/test-utils'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('Transaction Receipt React Component', () => {
  let receiptComp
  let transactionObj
  let uiShallow
  beforeEach(() => {
    console.log("CONTEXTTTT!!!!", context)
    transactionObj = {opinion: {statement: 'test'}, amount: '0', updatedAt: '2018-07-23 14:59:39.525-04'}
    receiptComp = shallow(<TransactionReceipt transaction={transactionObj} />)
    uiShallow = createShallow()
  })

  it('renders default state = myOpinions', () => {
      console.log("I DONT KNOW!!!!!!!!")
      console.log(receiptComp.find('.tester'))
    expect(receiptComp.find('td').text()).to.be.equal(' test ')
    const wrapper = uiShallow(<TransactionReceipt transaction={transactionObj} />)
    expect(wrapper.find('td').text()).to.be.equal(' test ')
  })
})
