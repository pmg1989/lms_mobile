import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import styles from './RadioStar.less'

const dicType = {
  4: 'satisfy',
  3: 'good',
  2: 'soso',
  1: 'bad',
}

const StarBox = ({ children, editable, value, onChange }) => {
  const handleChange = (_value, e) => {
    editable && onChange(_value, e)
  }
  return (
    <div className={styles.radio_box}>
      {React.Children.map(children,
        child => React.cloneElement(child, {
          value,
          onChange: handleChange,
        })
      )}
    </div>
  )
}
StarBox.propTypes = {
  children: PropTypes.any.isRequired,
  editable: PropTypes.bool.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
}

const Star = ({ children, value, type, onChange }) => {
  const active = value === type
  const source = active ? `${dicType[type]}_s` : dicType[type]
  return (
    <div className={classnames(styles.radio, active && styles.checked)} onClick={e => onChange(type, e)}>
      <img src={require(`images/feedback/${source}.png`)} alt="" />{children}
    </div>
  )
}
Star.propTypes = {
  children: PropTypes.any.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.number.isRequired,
  onChange: PropTypes.func,
}

class RadioStar extends Component {
  static propTypes = {
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    editable: PropTypes.bool,
    onChange: PropTypes.func,
  }

  static defaultProps = {
    editable: false,
  }

  state = {
    value: '',
  }

  componentWillReceiveProps (nextProps) {
    if ('value' in nextProps) {
      const value = nextProps.value
      this.setState({ value })
    }
  }

  handleChange = (value) => {
    if (!this.props.value) {
      this.setState({ value })
    }
    const onChange = this.props.onChange
    if (onChange) {
      onChange(value)
    }
  }

  render () {
    const { value } = this.state
    const { editable } = this.props
    return (
      <StarBox editable={editable} value={value} onChange={this.handleChange}>
        <Star type={4}>很满意</Star>
        <Star type={3}>满意</Star>
        <Star type={2}>不太满意</Star>
        <Star type={1}>不满意</Star>
      </StarBox>
    )
  }
}

export default RadioStar
