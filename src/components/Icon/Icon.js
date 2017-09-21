import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import './Icon.less'

class Icon extends Component {

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.object.isRequired,
    style: PropTypes.object,
  }

  state = {
    show: false,
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({ show: true })
    }, 150)
  }

  render () {
    const { className, style } = this.props
    let { type } = this.props
    const { show } = this.state

    if (type.default) {
      type = type.default
    }

    return (
      <svg className={`am-icon am-icon-${type.id} ${className || ''}`} style={style}>
        {show && <use xlinkHref={`#${type.id}`} />}
      </svg>
    )
  }
}

export default Icon
