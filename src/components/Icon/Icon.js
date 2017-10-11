import React from 'react'
import { PropTypes } from 'prop-types'

const Icon = ({ type, className = '', size = 'md', ...props }) => {
  return (
    <svg className={`am-icon am-icon-${type.default ? type.default.id : type} am-icon-${size} ${className}`} {...props}>
      <use xlinkHref={`#${type.default ? type.default.id : type}`} />
    </svg>
  )
}

Icon.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  size: PropTypes.object,
}

export default Icon
