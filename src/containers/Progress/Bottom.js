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
const now = +moment().format('X')

const Bottom = ({ info, params: { type, categoryId, contractId, proCategoryId }, lessons }) => {
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
    return lessons.size === countCnt
  }

  const isVip = () => {
    if (type !== 'profession') {
      // 也可以使用 proCategoryId 作为精确判断
      return true
    }

    return type === 'profession' && categoryId.includes('-vip-')
  }

  const isNotEnroll = () => {
    const notEnroll = ['composition', 'theory'].includes(categoryId)
    return type === 'profession' && notEnroll
  }

  const isDeadLine = () => {
    const deadline = info.get('contract_deadline')
    return now > deadline
  }

  const isJLFull = () => {
    return type === 'jl' && lessons.filter(item => item.get('available') > now).size > 0
  }

  const isHdFull = () => {
    if (type === 'hd') {
      const lessonsFilter = lessons.filter(item => item.get('available') > now)
      const isHdVip = proCategoryId.includes('-vip-')
      const isHdJp = proCategoryId.includes('-jp-')
      if (isHdVip) {
        return lessonsFilter.size >= 3
      }
      if (isHdJp) {
        return lessonsFilter.size >= 2
      }
    }
    return false
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
    if (isDeadLine()) {
      e.preventDefault()
      Toast.info('课程已结课,不能预约了哦!')
      return true
    }
    if (isHdFull()) {
      e.preventDefault()
      const isHdVip = proCategoryId.includes('-vip-')
      Toast.info(`互动${isHdVip ? 'VIP' : '精品'}课程只能同时预约${isHdVip ? '三' : '两'}节哦!`)
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
      if (isJLFull()) {
        e.preventDefault()
        Toast.info('交流课程只能同时预约一节哦!')
      }
    }
  }

  const isDisabled = () => {
    return isLock() || !isVip() || isNotEnroll() || isFull() || isDeadLine() || isJLFull() || isHdFull()
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
  lessons: PropTypes.object.isRequired,
}

export default Bottom
