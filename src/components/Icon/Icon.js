import React from 'react'
import { PropTypes } from 'prop-types'
import styles from './Icon.less'

const Icon = ({ className, style, type, onClick, ...props }) => {
  return (
    <span className={styles.icon_wrap} onClick={onClick}>
      <svg className={`am-icon am-icon-${type.default ? type.default.id : type} ${className || ''}`} style={style} {...props}>
        <use xlinkHref={`#${type.default ? type.default.id : type}`} />
      </svg>
    </span>
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
