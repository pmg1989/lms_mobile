import React from 'react'
// import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Icon, LinkToken } from 'components'
import styles from './Content.less'

const Content = () => {
  return (
    <div className={styles.list_box}>
      <ul className={styles.list}>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/complete.svg')} />
            <span className={styles.title}>1-30 19:00 2017</span>
          </div>
          <div className={styles.right}>
            <span className={styles.btn}>即将开课</span>
          </div>
        </li>
        <li>
          <div className={styles.left}>
            <Icon type={require('svg/complete.svg')} />
            <span className={styles.title}>1-30 19:00 2017</span>
          </div>
          <div className={styles.right}>
            <LinkToken className={classnames(styles.btn, styles.border)} to={'/demo/123/456?name=felix&token=abc'}>
              取消预约
            </LinkToken>
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
            <LinkToken className={classnames(styles.btn, styles.border, styles.blue)} to={'/demo/123/456?name=felix&token=abc'}>
              取消预约
            </LinkToken>
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Content
