import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Helmet } from "react-helmet"
import { Header } from 'components'
import { feedbackActions } from 'actions/feedback'
import Content from './Content'

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

    const contentProps = {
      lessons: feedback.get('lessons'),
    }

    return (
      <div className="content-box">
        <Helmet><title>我的反馈</title></Helmet>
        <Header>我的反馈</Header>
        <div className="content">
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
