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

const Bottom = ({ info, params: { type, categoryId, contractId } }) => {
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

  const checkIsLock = (e) => {
    const lockStart = info.get('contract_freezestart')
    const lockEnd = info.get('contract_freezeend')

    if (lockStart && lockEnd && (now >= lockStart && now <= lockEnd)) {
      e.preventDefault()
      Toast.info(`课程已冻结，无法订课！冻结时间为：${moment.unix(lockStart).format('YYYY-MM-DD')} ~ ${moment.unix(lockEnd).format('YYYY-MM-DD')}`)
      return false
    }
    return true
  }

  const checkIsVip = (e) => {
    if (checkIsLock(e)) {
      const categoryIdnumber = info.get('category_idnumber')
      const isVip = categoryIdnumber.includes('-vip-')
      const notEnroll = ['composition', 'theory'].includes('categoryId')
      const curCnt = info.get('attendedlesson_cnt')
      const countCnt = info.get('contractlesson_cnt')
      if (type === 'profession' && !isVip) {
        e.preventDefault()
        Toast.info('只有VIP学员可以预约上课哦！')
      }
      if (type === 'profession' && notEnroll) {
        e.preventDefault()
        Toast.info('该课程暂时无法预约哦!')
      }
      if (curCnt === countCnt) {
        e.preventDefault()
        Toast.info('你的课程已经预约满了哦!')
      }
    }
  }

  const isDisabled = () => {
    const lockStart = info.get('contract_freezestart')
    const lockEnd = info.get('contract_freezeend')
    if (lockStart && lockEnd && (now >= lockStart && now <= lockEnd)) {
      return true // 账号被锁了
    }

    const categoryIdnumber = info.get('category_idnumber')
    const isVip = categoryIdnumber.includes('-vip-')
    const notEnroll = ['composition', 'theory'].includes('categoryId')
    if (type === 'profession' && !isVip) {
      return true // 只有VIP学员可以预约上课
    }
    if (type === 'profession' && notEnroll) {
      return true // composition、theory课程暂时无法预约
    }

    const curCnt = info.get('attendedlesson_cnt')
    const countCnt = info.get('contractlesson_cnt')
    if (curCnt === countCnt) {
      return true // 课程已经预约满了
    }
    return false
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
}

export default Bottom
