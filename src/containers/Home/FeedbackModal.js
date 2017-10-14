import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { Modal } from 'antd-mobile'
import { browserHistory } from 'react-router'
import { Icon } from 'components'
import { queryString } from 'utils/tools'
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
      title: <Icon className={styles.title_icon} type={require('svg/complete.svg')} />,
      visible,
      platform: 'ios',
      transparent: true,
      maskClosable: false,
      footer: [
        {
          text: '关闭',
          onPress: () => this.handleClose(),
        },
        {
          text: <span className={styles.btn}>课后反馈</span>,
          onPress: () => {
            this.handleClose()
            browserHistory.push({
              pathname: '/feedback',
              query: {
                mobile: queryString('mobile'),
                token: queryString('token'),
              },
            })
          },
        },
      ],
    }

    return (
      <Modal {...modalProps}>
        <div className={styles.title}>声乐VIP第一阶段</div>
        <p>专业课 2017-11-26 13：30</p>
        <p>已完成该课程</p>
      </Modal>
    )
  }
}

export default FeedbackModal
