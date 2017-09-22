import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from 'components'
import styles from './StudyList.less'

const Title = ({ title }) => (
  <div className={styles.title_box}>
    <span className={styles.title}>{title}</span>
  </div>
)
Title.propTypes = {
  title: PropTypes.string.isRequired,
}

const TitleBanner = ({ title, image, status }) => {
  const dic = {
    0: { css: 'start', text: '待开课' },
    1: { css: 'end', text: '已节课' },
  }

  return (
    <div className={styles.title_image_box} style={{
      background: `url('${image}') no-repeat center center`,
      backgroundSize: 'cover' }}
    >
      <span>{title}</span>
      {status < 2 && <span className={classnames(styles.tips, styles[dic[status].css])}>{dic[status].text}</span>}
    </div>
  )
}
TitleBanner.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  status: PropTypes.number.isRequired,
}

const StudyList = () => {
  return (
    <div className={styles.list_box}>
      <Title title="声乐课" />
      <TitleBanner title="声乐VIP第一阶段" status={0} image="https://o9u2lnvze.qnssl.com/upload/599f44feb33e6ef97b00efc2cea28e41.png?1495444468" />
      <ul className={styles.list}>
        <li className={styles.item}>
          <div className={styles.left}>
            <span className={styles.title}>专业课</span>
            <span className={styles.content}>下节课 11-26 13:30 (即将开课)</span>
          </div>
          <div className={styles.right}>
            <span>已完成 · 12 / 36</span>
            <span><Link className={styles.btn} to={'/introduce'}>查看</Link></span>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.left}>
            <span className={styles.title}>专业课</span>
            <span>下节课 未预约</span>
          </div>
          <div className={styles.right}>
            <span>已完成 · 0 / 16</span>
            <span><Link className={classnames(styles.btn, styles.btn_blue)} to={'/introduce'}>预约</Link></span>
          </div>
        </li>
        <li className={styles.item}>
          <div className={styles.left}>
            <span className={styles.title}>专业课</span>
            <span>待开课</span>
          </div>
          <div className={styles.right}>
            <span>已完成 · 0 / 16</span>
          </div>
        </li>
      </ul>
      <div className={styles.btn_box}>
        <Link className={styles.btn} to={'./introduce'}>
          <Icon className={styles.icon} type={require('svg/cry.svg')} /> 练习歌曲
        </Link>
      </div>
    </div>
  )
}

export default StudyList
