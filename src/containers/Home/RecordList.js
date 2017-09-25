import React from 'react'
import { Icon } from 'components'
import { Title } from './StudyList'
import styles from './RecordList.less'

const RecordList = () => {
  return (
    <div className={styles.list_box}>
      <Title title="我的录音作品" />
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.left}>
            <span>1</span><span className={styles.title}>你把我灌醉</span>
          </div>
          <div className={styles.play}>
            <Icon type={require('svg/play.svg')} />
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.left}>
            <span>1</span><span className={styles.title}>你把我灌醉</span>
          </div>
          <div className={styles.pause}>
            <Icon type={require('svg/pause.svg')} />
          </div>
        </li>
      </ul>
    </div>
  )
}

export default RecordList
