import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { OpinionSelector, ListGenerator } from './'
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props

  return (
    <div>
      <OpinionSelector />
      <ListGenerator />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
}
