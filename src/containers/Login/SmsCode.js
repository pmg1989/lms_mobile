import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd-mobile'
import styles from './SmsCode.less'

class SmsCode extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    status: PropTypes.number.isRequired,
    onGetPhoneCode: PropTypes.func.isRequired,
    onResetStatus: PropTypes.func.isRequired,
  }

  state = {
    tick: 0,
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.status !== 1 && nextProps.status === 1) {
      this.tickDown(60)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.tickTime)
  }

  tickDown = (tick) => {
    this.setState({ tick: tick - 1 }, () => {
      if (this.state.tick > 0) {
        this.tickTime = setTimeout(() => this.tickDown(this.state.tick), 1000)
      } else {
        this.props.onResetStatus()
      }
    })
  }

  handleClick = () => {
    const { onGetPhoneCode } = this.props
    onGetPhoneCode()
  }

  render () {
    const { loading } = this.props
    const { tick } = this.state
    return (
      <Button
        disabled={loading || tick > 0}
        onClick={this.handleClick}
        className={styles.btn_code}
        type="ghost" inline size="small"
      >
        {tick > 0 ? `${tick}s后重新获取` : '获取验证码'}
      </Button>
    )
  }
}

export default SmsCode
