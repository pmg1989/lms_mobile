import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import { Progress } from 'antd-mobile'
import styles from './Top.less'

const Top = ({ info, hasLessons }) => {
  const curCnt = info.get('attendedlesson_cnt')
  const countCnt = info.get('contractlesson_cnt')
  const curProgress = ((curCnt / countCnt) * 100) || 0
  const nextLession = info.get('currentlesson_available')
  const leftDay = info.get('contract_deadline')

  return (
    <div className={styles.box}>
      {hasLessons ?
        <div>
          <div className={styles.title}>已学习到第{info.get('attendedlesson_cnt')}节课</div>
          <Progress percent={curProgress} position="normal" />
          <span className={styles.text}>
            {/* 课程进度{curProgress.toFixed(0)}%，距离课程预约截止日{leftDay && moment.unix(leftDay).fromNow()} */}
            课程进度{curCnt}/{countCnt}，课程截止至 {leftDay && moment.unix(leftDay).format('YYYY年MM月DD日')}
          </span>
          <div className={styles.text2}>
            下节课时间：{nextLession ? moment.unix(nextLession).format('YYYY-MM-DD HH:mm') : '未预约'}
          </div>
        </div> :
        <div>
          <div className={styles.title}>还未预约课程</div>
          <Progress percent={0} position="normal" />
          <span className={styles.text}>
            课程进度{curCnt}/{countCnt}，课程截止至 {leftDay && moment.unix(leftDay).format('YYYY年MM月DD日')}
          </span>
        </div>
      }
    </div>

  )
}

Top.propTypes = {
  hasLessons: PropTypes.bool.isRequired,
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Top
