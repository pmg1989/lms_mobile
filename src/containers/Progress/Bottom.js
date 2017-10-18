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
      pathname: '/feedback',
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
      if (type === 'profession' && !isVip) {
        e.preventDefault()
        Toast.info('只有VIP学员可以预约上课哦！')
      }
      if (type === 'profession' && notEnroll) {
        e.preventDefault()
        Toast.info('该课程暂时无法预约哦!')
      }
    }
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
          <LinkToken className={styles.btn} onClick={checkIsVip} to={`/reserve/${contractId}/${categoryId}`}>
            预约课程
          </LinkToken>
        </div>
      }
      {type === 'hd' &&
        <div className={styles.right}>
          <LinkToken className={styles.btn} onClick={checkIsLock} to={`/reserve/${contractId}/hd-rhythm`}>
            预约节奏课
          </LinkToken>
          <LinkToken className={classnames(styles.btn, styles.orange)} onClick={checkIsLock} to={`/reserve/${contractId}/hd-yoga`}>
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
