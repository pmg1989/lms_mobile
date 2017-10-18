import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header, Notice } from 'components'
import { feedbackActions } from 'actions/feedback'
import Content from './Content'
import styles from './Feedback.less'

class Feedback extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    feedback: PropTypes.instanceOf(Immutable.Map).isRequired,
    onFeedback: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params, onFeedback } = this.props
    onFeedback.getFeedbackList(params.contractId, params.categoryId)
  }

  render () {
    const { feedback } = this.props

    const noticeProps = {
      className: styles.feedback_notice,
      notice: Immutable.fromJS({
        title: 'Tip',
        content: '学员需要在课后24小时内对该课程进行反馈噢，否则系统会判断“反馈超时”。',
      }),
    }

    const contentProps = {
      lessons: feedback.get('lessons'),
    }

    return (
      <div className="content-box">
        <Header>我的反馈</Header>
        <div className="content">
          <Notice {...noticeProps} />
          <Content {...contentProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  feedback: state.get('feedback'),
  params: ownProps.params,
})

const mapDispatchToProps = dispatch => ({
  onFeedback: bindActionCreators(feedbackActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feedback)
