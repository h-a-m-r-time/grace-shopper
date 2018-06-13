/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ListGenerator from './listGenerator'

// import Opinion from './opinion'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('ListGenerator React Component', () => {
  let listComp

  beforeEach(() => {
    listComp = shallow(<ListGenerator />).dive({ context })
  })

  it('renders default state = myOpinions', () => {
    expect(listComp.state('displayOrder')).to.be.deep.equal('allOpinions')
  })
})
