import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { Progress } from 'antd-mobile'
import styles from './Top.less'

const Top = ({ info }) => {
  const curCnt = info.get('attendedlesson_cnt')
  const curProgress = ((curCnt / info.get('constract_lesson_cnt')) * 100) || 0
  const nextLession = info.get('currentlesson_available')

  return (
    <div className={styles.box}>
      <div className={styles.title}>已学习到第{info.get('attendedlesson_cnt')}节课</div>
      <Progress percent={curProgress} position="normal" />
      <span className={styles.text}>课程进度{curProgress.toFixed(0)}%，距离课程预约截止日还剩32天</span>
      <div className={styles.text2}>
        下节课时间：{nextLession ? moment.unix(nextLession).format('YYYY-MM-DD HH:mm') : '未预约'}
      </div>
    </div>

  )
}

Top.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Top
