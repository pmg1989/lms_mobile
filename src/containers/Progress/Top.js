import React from 'react'
// import PropTypes from 'prop-types'
import { Progress } from 'antd-mobile'
import styles from './Top.less'

const Top = () => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>已学习到第23节课</div>
      <Progress percent={30} position="normal" />
      <span className={styles.text}>课程进度30%，距离课程预约截止日还剩32天</span>
    </div>

  )
}

export default Top
