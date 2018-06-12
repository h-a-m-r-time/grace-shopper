/* global describe beforeEach it */

import {expect} from 'chai'
import React from 'react'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import {UserHome} from './user-home'

// import Opinion from './opinion'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {
  let userHome

  beforeEach(() => {
    userHome = shallow(<UserHome email="cody@email.com" />)
  })

  it('renders the email in an h3', () => {
    expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
  })
})

// describe('Opinion', () => {
//   let opinionComp

//   const opinion = {
//     statement: 'life is meaningless'
//   }

//   beforeEach(() => {
//     opinionComp = shallow(<Opinion opinion={opinion} />)
//   })

//   it('renders the opinion statement in an h2', () => {
//     expect(opinionComp.find('h2').text()).to.be.equal('life is meaningless')
//   })
// })
