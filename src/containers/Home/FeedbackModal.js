import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Modal } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import styles from './FeedbackModal.less'

class FeedbackModal extends Component {
  static propTypes = {
    feedback: PropTypes.instanceOf(Immutable.Map).isRequired,
  }

  state = {
    visible: this.props.feedback.get('visible'),
  }

  handleClose = () => {
    this.setState({ visible: false })
    console.log('remember to set localStroage')
  }

  render () {
    const { visible } = this.state

    const modalProps = {
      title: (
        <div className={styles.title_box}>
          <Icon className={styles.title_icon} type={require('svg/complete.svg')} />
          <Icon className={styles.close_icon} type={require('svg/close.svg')} onClick={this.handleClose} />
        </div>
      ),
      visible,
      platform: 'ios',
      transparent: true,
      maskClosable: false,
      footer: [],
    }

    return (
      <Modal {...modalProps}>
        <div className={styles.title}>声乐VIP第一阶段</div>
        <p>专业课 2017-11-26 13：30</p>
        <p>已完成该课程</p>
        <LinkToken className={styles.btn} to={'/demo'} onClick={this.handleClose}>课后反馈</LinkToken>
      </Modal>
    )
  }
}

export default FeedbackModal
