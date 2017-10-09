import React from 'react'
import { PropTypes } from 'prop-types'

const Icon = ({ className, style, type, onClick, ...props }) => {
  return (
    <svg onClick={onClick} className={`am-icon am-icon-${type.default ? type.default.id : type} ${className || ''}`} style={style} {...props}>
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
  style: PropTypes.object,
  onClick: PropTypes.func,
}

export default Icon
