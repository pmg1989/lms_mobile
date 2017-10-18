import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from './RadioGroup.less'

class RadioGroup extends Component {
  static propTypes = {
    editable: PropTypes.bool.isRequired,
    field: PropTypes.any.isRequired,
    children: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  }

  state = {
    value: this.props.field.props.value.toString(),
  }

  componentWillReceiveProps (nextProps) {
    if (!this.props.field.props.value && nextProps.field.props.value) {
      this.setState({ value: nextProps.field.props.value.toString() })
    }
  }

  handleChange (value) {
    this.setState({ value })
    this.props.onChange(value)
  }

  render () {
    const { editable, field, children } = this.props
    const { value } = this.state

    return (
      <div className={styles.radio_box}>
        {field}
        {React.Children.map(children,
          child => React.cloneElement(child, {
            editable,
            groupValue: value,
            onChange: ::this.handleChange,
          })
        )}
      </div>
    )
  }
}

export default RadioGroup
