import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Notice } from 'components'
import { progressActions } from 'actions/progress'
import Content from './Content'
import styles from './Feedback.less'

const Feedback = () => {
  const noticeProps = {
    className: styles.feedback_notice,
    notice: Immutable.fromJS({
      title: 'Tip',
      content: '学员需要在课后24小时内对该课程进行反馈噢，否则系统会判断未“反馈超时”。',
    }),
  }

  return (
    <div className="content-box">
      <Header>我的反馈</Header>
      <div className="content">
        <Notice {...noticeProps} />
        <Content />
      </div>
    </div>
  )
}

Feedback.propTypes = {
  home: PropTypes.instanceOf(Immutable.Map).isRequired,
}

const mapStateToProps = state => ({
  home: state.get('home'),
})

const mapDispatchToProps = dispatch => ({
  onProgress: bindActionCreators(progressActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
