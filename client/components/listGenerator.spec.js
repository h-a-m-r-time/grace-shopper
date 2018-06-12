/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import ListGenerator from './listGenerator'
const { JSDOM } = require('jsdom')

const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
const { window } = jsdom

// import Opinion from './opinion'

const adapter = new Adapter()
enzyme.configure({ adapter })

describe('ListGenerator React Component', () => {
  let listComp
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>')
  const { window } = jsdom

  beforeEach(() => {
    listComp = shallow(<ListGenerator />).dive({ context })
  })

  it('renders default state = myOpinions', () => {
    expect(listComp.state('displayOrder')).to.be.deep.equal('allOpinions')
  })
})
