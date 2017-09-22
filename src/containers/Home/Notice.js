import React from 'react'
import { NoticeBar } from 'antd-mobile'
import styles from './Notice.less'

const Notice = () => {

  const noticeBarProps = {
    className: styles.content,
    icon: null,
    marqueeProps: { loop: true, trailing: 0 },
    style: { backgroundColor: 'transparent' }
  }

  return (
    <div className={styles.notice_box}>
      <span className={styles.title}>牛班公告：</span>
      <NoticeBar {...noticeBarProps}>本周将有神秘嘉宾来到牛班教室！本周将有神秘嘉宾来到牛班教室！点击查看</NoticeBar>
    </div>
  )
}

export default Notice
