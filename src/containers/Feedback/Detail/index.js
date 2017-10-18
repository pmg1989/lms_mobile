import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { feedbackActions } from 'actions/feedback'
import Content from './Content'

class FeedbackDetail extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    readOnly: PropTypes.bool.isRequired,
    item: PropTypes.instanceOf(Immutable.Map).isRequired,
    onFeedback: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params: { lessonId }, readOnly, onFeedback } = this.props
    readOnly && onFeedback.getFeedbackItem(lessonId)
  }

  render () {
    const { params: { lessonId }, readOnly, item, onFeedback } = this.props
    const contentProps = {
      readOnly,
      lessonId,
      item,
      onFeedback,
    }

    return (
      <div className="content-box">
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
  readOnly: !ownProps.location.query.type,
})

const mapDispatchToProps = dispatch => ({
  onFeedback: bindActionCreators(feedbackActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDetail)
