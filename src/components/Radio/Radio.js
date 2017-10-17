import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './Radio.less'

class Radio extends Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    groupValue: PropTypes.string,
    value: PropTypes.string.isRequired,
    children: PropTypes.any.isRequired,
    onChange: PropTypes.func,
  }

  state = {
    checked: this.props.groupValue === this.props.value,
  }

  handleChecked () {
    this.setState({ checked: true })
    if (this.props.onChange) {
      this.props.onChange(this.props.value)
    }
  }

  render () {
    const { type, value, groupValue, children } = this.props
    const { checked } = this.state
    const source = checked && groupValue === value ? `${type}_s` : type

    return (
      <div className={classnames(styles.radio, checked && groupValue === value && styles.checked)} onClick={::this.handleChecked}>
        <img src={require(`images/feedback/${source}.png`)} alt="" />
        {children}{value}
      </div>
    )
  }
}

export default Radio
