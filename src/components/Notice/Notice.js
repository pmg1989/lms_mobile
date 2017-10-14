import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import classnames from 'classnames'
import { NoticeBar } from 'antd-mobile'
import styles from './Notice.less'

const Notice = ({ notice, className }) => {
  const noticeBarProps = {
    className: styles.content,
    icon: null,
    marqueeProps: { loop: true, trailing: 0 },
    style: { backgroundColor: 'transparent' },
  }

  return (
    <div className={classnames(styles.notice_box, className)}>
      <span className={classnames('title', styles.title)}>{notice.get('title')}：</span>
      <NoticeBar {...noticeBarProps}>
        { notice.get('link') ? <a href={notice.get('link')}>{notice.get('content')}</a> : notice.get('content') }
      </NoticeBar>
    </div>
  )
}

Notice.propTypes = {
  className: PropTypes.string,
  notice: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Notice
