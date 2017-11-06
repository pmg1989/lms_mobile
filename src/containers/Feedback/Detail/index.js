import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Header } from 'components'
import { feedbackActions } from 'actions/feedback'
import Content from './Content'

class FeedbackDetail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    editable: PropTypes.bool.isRequired,
    item: PropTypes.instanceOf(Immutable.Map).isRequired,
    lesson: PropTypes.instanceOf(Immutable.Map).isRequired,
    onFeedback: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { lessonId }, editable, onFeedback } = this.props
    if (editable) {
      onFeedback.resetFeedbackItem()
    } else {
      onFeedback.getFeedbackItem(lessonId)
    }
    // 为诸葛IO统计数据信息时使用
    onFeedback.getFeedbackLesson(lessonId)
  }

  render () {
    const { params: { lessonId }, editable, item, lesson, onFeedback } = this.props
    const contentProps = {
      editable,
      lessonId,
      item,
      lesson,
      onFeedback,
    }

    return (
      <div className="content-box">
        <Helmet><title>本课满意度调查</title></Helmet>
        <Header>本课满意度调查</Header>
        <div className="content">
          <Content {...contentProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  item: state.getIn(['feedback', 'item']),
  lesson: state.getIn(['feedback', 'lesson']),
  editable: ownProps.location.query.type === 'add',
})

const mapDispatchToProps = dispatch => ({
  onFeedback: bindActionCreators(feedbackActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDetail)
