import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import moment from 'moment'
import styles from './Content.less'

const Content = ({ info, comment }) => {
  const commentText = comment.getIn(['suggestion', 'student'])
  const gradeTime = info.get('gradetime')
  return (
    <div className={styles.box}>
      <div className={styles.title}>第{info.get('lesson_cnt')}节课评语</div>
      <div className={styles.content}>
        <div className={styles.name}>{info.get('student')}同学：</div>
        <hr />
        <div className={styles.text}>
          {commentText ?
            <span>{commentText}</span> :
            <span>老师会在24小时内完成评论
<br />请稍后查看</span>
          }
        </div>
        {gradeTime &&
        <div className={styles.bottom}>
          <span>{info.get('teacher')} 老师</span><br />
          {moment.unix(gradeTime).format('YYYY-M-D')}
        </div>
        }
      </div>
    </div>
  )
}

Content.propTypes = {
  info: PropTypes.instanceOf(Immutable.Map).isRequired,
  comment: PropTypes.instanceOf(Immutable.Map).isRequired,
}

export default Content
