import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { queryString } from 'utils/tools'

const LinkToken = ({ children, to, ...props }) => {
  const symbol = to.includes('?') ? '&' : '?'
  to = `${to}${symbol}mobile=${queryString('mobile')}&token=${queryString('token')}`

  return (
    <Link to={to} {...props}>{children}</Link>
  )
}

LinkToken.propTypes = {
  children: PropTypes.any.isRequired,
  to: PropTypes.string.isRequired,
}

export default LinkToken
