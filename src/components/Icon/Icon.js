import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import './Icon.less'

class Icon extends Component {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
    ]).isRequired,
    style: PropTypes.object,
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
    const { className, style, type } = this.props
    const { show } = this.state

    return (
      <svg className={`am-icon am-icon-${type.default ? type.default.id : type} ${className || ''}`} style={style}>
        {show && <use xlinkHref={`#${type.default ? type.default.id : type}`} />}
      </svg>
    )
  }
}

export default Icon
