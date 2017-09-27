import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import styles from './Icon.less'

class Icon extends Component {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    style: PropTypes.object,
    onClick: PropTypes.func,
  }

  state = {
    show: false,
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ show: true })
    }, 100)
  }

  render () {
    const { className, style, type, onClick, ...props } = this.props
    const { show } = this.state

    return (
      <span className={styles.icon_wrap} onClick={onClick}>
        <svg className={`am-icon am-icon-${type.default ? type.default.id : type} ${className || ''}`} style={style} {...props}>
          {show && <use xlinkHref={`#${type.default ? type.default.id : type}`} />}
        </svg>
      </span>
    )
  }
}

export default Icon
