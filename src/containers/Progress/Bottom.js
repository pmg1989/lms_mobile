import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { browserHistory } from 'react-router'
import { queryString } from 'utils/tools'
import { Popover } from 'antd-mobile'
import { Icon, LinkToken } from 'components'
import styles from './Bottom.less'

const Item = Popover.Item

const Bottom = ({ info, params: { type, courseType, contractId } }) => {
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
          <LinkToken className={styles.btn} to={`/reserve/${courseType}/${contractId}`}>
            预约课程
          </LinkToken>
        </div>
      }
      {type === 'hd' &&
        <div className={styles.right}>
          <LinkToken className={styles.btn} to={`/reserve/hd-rhythm/${contractId}`}>
            预约节奏课
          </LinkToken>
          <LinkToken className={classnames(styles.btn, styles.orange)} to={`/reserve/hd-yoga/${contractId}`}>
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
