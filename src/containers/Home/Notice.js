import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { NoticeBar } from 'antd-mobile'
import styles from './Notice.less'

const Notice = ({ notice }) => {
  const noticeBarProps = {
    className: styles.content,
    icon: null,
    marqueeProps: { loop: true, trailing: 0 },
    style: { backgroundColor: 'transparent' },
  }

  return (
    <div className={styles.notice_box}>
      <span className={styles.title}>牛班公告：</span>
      <NoticeBar {...noticeBarProps}>
        { !!notice.get('link') ? <a href={notice.get('link')}>{notice.get('title')}</a> : notice.get('title') }
      </NoticeBar>
    </div>
  )
}

Notice.propTypes = {
  notice: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Notice
