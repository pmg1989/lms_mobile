import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './RadioGroup.less'

class RadioGroup extends Component {
  static propTypes = {
    getFieldProps: PropTypes.object.isRequired,
    children: PropTypes.any.isRequired,
  }

  state = {
    value: this.props.getFieldProps.value,
  }

  handleChange (value) {
    this.setState({ value })
  }

  render () {
    const { children, getFieldProps } = this.props
    const { value } = this.state
    return (
      <div className={styles.radio_box}>
        <input {...getFieldProps} value={value}
          style={{ display: 'none' }}
        />
        {React.Children.map(children,
       child => React.cloneElement(child, {
         groupValue: value,
         onChange: ::this.handleChange,
       })
      )}
      </div>
    )
  }
}

export default RadioGroup
