/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import ListGenerator from './listGenerator'

const defaultProps = {

}

/**
 * sets up the shallow object for testing
 * @global   {Function} shallow from enzyme
 * @return   {ShallowWrapper} - component to test
 */
const setup = (props={}) => {
    const setupProps = { ...defaultProps, ...props }
    return shallow(<ListGenerator { ...setupProps } />)
}

describe('ListGenerator React Component', () => {

  it('renders default state = myOpinions', () => {
    const listComp = setup().dive({ context })
    expect(listComp.state('displayOrder')).to.be.deep.equal('allOpinions')
  })
})
