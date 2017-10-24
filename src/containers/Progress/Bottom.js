import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import moment from 'moment'
import { browserHistory } from 'react-router'
import { queryString } from 'utils/tools'
import { Popover, Toast } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import styles from './Bottom.less'

const Item = Popover.Item
const now = new Date().getTime() / 1000

const Bottom = ({ info, params: { type, categoryId, contractId }, lessonsSize }) => {
  const lockStart = info.get('contract_freezestart')
  const lockEnd = info.get('contract_freezeend')

  const popoverProps = {
    visible: info.get('tofeedback'),
    placement: 'top',
    overlayClassName: styles.feedback_box,
    align: { offset: [20, -10] },
    overlay: [<Item key="1" value="tips">有课程未反馈</Item>],
  }

  const goToFeedBack = () => {
    browserHistory.push({
      pathname: `/feedback/${encodeURIComponent(contractId)}/${categoryId}`,
      query: {
        mobile: queryString('mobile'),
        token: queryString('token'),
      },
    })
  }

  const isLock = () => {
    return !!lockStart && !!lockEnd && (now >= lockStart && now <= lockEnd)
  }

  const isFull = () => {
    const countCnt = info.get('contractlesson_cnt') || 0
    return lessonsSize === countCnt
  }

  const isVip = () => {
    return type === 'profession' && categoryId.includes('-vip-')
  }

  const isNotEnroll = () => {
    const notEnroll = ['composition', 'theory'].includes(categoryId)
    return type === 'profession' && notEnroll
  }

  const checkIsLock = (e) => {
    if (isLock()) {
      e.preventDefault()
      Toast.info(`课程已冻结，无法订课！冻结时间为：${moment.unix(lockStart).format('YYYY-MM-DD')} ~ ${moment.unix(lockEnd).format('YYYY-MM-DD')}`)
      return true
    }
    if (isFull()) {
      e.preventDefault()
      Toast.info('你的课程已经预约满了哦!')
      return true
    }
    return false
  }

  const checkIsVip = (e) => {
    if (!checkIsLock(e)) {
      if (!isVip()) {
        e.preventDefault()
        Toast.info('只有VIP学员可以预约上课哦！')
      }
      if (isNotEnroll()) {
        e.preventDefault()
        Toast.info('该课程暂时无法预约哦!')
      }
    }
  }

  const isDisabled = () => {
    return isLock() || !isVip() || isNotEnroll() || isFull()
  }

  return (
    <div className={styles.box}>
      <div className={styles.left} onClick={goToFeedBack}>
        <Popover {...popoverProps}>
          <Icon type={require('svg/feedback.svg')} />
        </Popover>
        <span>我的反馈</span>
      </div>
      {['profession', 'jl'].includes(type) &&
        <div className={styles.right}>
          <LinkToken className={classnames(styles.btn, isDisabled() && styles.disabled)} onClick={checkIsVip} to={`/reserve/${encodeURIComponent(contractId)}/${categoryId}`}>
            预约课程
          </LinkToken>
        </div>
      }
      {type === 'hd' &&
        <div className={styles.right}>
          <LinkToken className={classnames(styles.btn, isDisabled() && styles.disabled)} onClick={checkIsLock} to={`/reserve/${encodeURIComponent(contractId)}/hd-rhythm`}>
            预约节奏课
          </LinkToken>
          <LinkToken className={classnames(styles.btn, isDisabled() && styles.disabled)} onClick={checkIsLock} to={`/reserve/${encodeURIComponent(contractId)}/hd-yoga`}>
            预约瑜伽课
          </LinkToken>
        </div>
      }
    </div>
  )
}

Bottom.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
  params: PropTypes.object.isRequired,
  lessonsSize: PropTypes.number.isRequired,
}

export default Bottom
