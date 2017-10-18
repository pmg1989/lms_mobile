import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { Modal } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import { CLOSED_FEEDBACK_LIST } from 'constants/home-constants'
import { renderTypeName } from 'utils/tools'
import styles from './FeedbackModal.less'

const closeList = localStorage.getItem(CLOSED_FEEDBACK_LIST)

class FeedbackModal extends Component {
  static propTypes = {
    feedbackList: PropTypes.instanceOf(Immutable.List).isRequired,
  }

  state = {
    visible: false,
    item: Immutable.fromJS({}),
  }

  componentWillReceiveProps(nextProps) {
    if(!this.props.feedbackList.size && !!nextProps.feedbackList.size) {
      if(!!closeList) {
        for(let item of nextProps.feedbackList) {
          if(!closeList.includes(item.get('id'))) {
            this.setState({ visible: true, item })
            break
          }
        }
      } else {
        this.setState({ visible: true, item: nextProps.feedbackList.get(0) })
      }
    }
  }

  handleClose = () => {
    this.setState({ visible: false })
    const padLeftString = !!closeList ? `${closeList},` : ''
    localStorage.setItem(CLOSED_FEEDBACK_LIST, `${padLeftString}${this.state.item.get('id')}`)
  }

  render () {
    const { visible, item } = this.state

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
        <div className={styles.title}>{item.get('category_summary')}</div>
        <p>
          {renderTypeName(item.get('lessontype'))} {moment.unix(item.get('available')).format('YYYY-MM-DD HH:mm')}
        </p>
        <p>已完成该课程</p>
        <LinkToken className={styles.btn} to={`feedback/${item.get('id')}`} onClick={this.handleClose}>课后反馈</LinkToken>
      </Modal>
    )
  }
}

export default FeedbackModal
