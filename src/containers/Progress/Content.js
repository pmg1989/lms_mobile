import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Modal } from 'antd-mobile'
import { Icon } from 'components'
import styles from './Content.less'

const alert = Modal.alert

const Content = () => {
  const handleCancel = () => {
    alert(
      <span className={styles.modal_title}>取消预定课程</span>,
      <div>
        <span>键盘VIP第一阶段(上)</span><br /><span>2016-11-20 10:00</span>
      </div>,
      [
        { text: '取消', onPress: () => console.log('cancel') },
        { text: '确定', onPress: () => console.log('ok') },
      ],
    )
  }

  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/cry.svg')} />
            <span className={styles.title}>1-30 19:00 2017</span>
          </div>
          <div className={styles.right}>
            <span className={styles.btn}>即将开课</span>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/cry.svg')} />
            <span className={styles.title}>1-30 19:00 2017</span>
          </div>
          <div className={styles.right}>
            <span className={classnames(styles.btn, styles.border)} onClick={handleCancel}>
              取消预约
            </span>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/uncompleted.svg')} />
            <span className={styles.title}>1-30 19:00 2017</span>
          </div>
          <div className={styles.right}>
            <span className={classnames(styles.btn, styles.undo)}>缺席</span>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/complete.svg')} />
            <span className={styles.title}>1-30 19:00 2017</span>
          </div>
          <div className={styles.right}>
            <span className={classnames(styles.btn, styles.border, styles.blue)} onClick={handleCancel}>
              取消预约
            </span>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Content
