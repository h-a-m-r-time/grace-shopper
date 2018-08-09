/* global describe beforeEach it */

import { expect } from 'chai'
import React from 'react'
import { shallow } from 'enzyme'
import { ListGenerator } from './listGenerator'

const defaultProps = {
    classes: {
        button: 'button',
        input: 'input'
    }
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
  it('renders succesfully', () => {
      const wrapper = setup()
      expect(wrapper.length).to.equal(1)
  })
  it('renders default state = myOpinions', () => {
    const listComp = setup()
    expect(listComp.state('displayOrder')).to.be.deep.equal('allOpinions')
  })
  it('renders necessary buttons', () => {
      const wrapper = setup()
      const allButton = wrapper.find('#list-allOpinions')
      const myButton = wrapper.find('#list-myOpinions')
      const topButton = wrapper.find('#list-topOpinions')
      const newButton = wrapper.find('#list-newOpinions')
      expect(allButton.length).to.equal(1)
      expect(myButton.length).to.equal(1)
      expect(topButton.length).to.equal(1)
      expect(newButton.length).to.equal(1)
  })
  it('changes state appropriately on button clicks', () => {
      const wrapper = setup()
      const button = wrapper.find('#list-allOpinions')
      wrapper.setState({displayOrder: 'myOpinions'})
      button.simulate('click', {currentTarget: button.props()})
      expect(wrapper.state('displayOrder')).to.equal('allOpinions')
  })
  it('changes state appropriately on button clicks', () => {
      const wrapper = setup()
      const button = wrapper.find('#list-myOpinions')
      button.simulate('click', {currentTarget: button.props()})
      expect(wrapper.state('displayOrder')).to.equal('myOpinions')
  })
  it('changes state appropriately on button clicks', () => {
      const wrapper = setup()
      const button = wrapper.find('#list-topOpinions')
      button.simulate('click', {currentTarget: { name: button.props().name}})
      expect(wrapper.state('displayOrder')).to.equal('topOpinions')
  })
  it('changes state appropriately on button clicks', () => {
      const wrapper = setup()
      const button = wrapper.find('#list-newOpinions')
      button.simulate('click', {currentTarget: { name: button.props().name}})
      expect(wrapper.state('displayOrder')).to.equal('newOpinions')
  })
})
