import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { feedbackActions } from 'actions/feedback'
import List from './List'

class Practice extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    feedback: PropTypes.instanceOf(Immutable.Map).isRequired,
    onFeedback: PropTypes.object.isRequired,
  }

  componentWillMount () {
    // const { params, onFeedback } = this.props
    // onFeedback.getFeedbackList(params.contractId, params.categoryId)
  }

  render () {
    // const { feedback } = this.props

    return (
      <div className="content-box">
        <Header>练习</Header>
        <div className="content">
          <List showMore={false} />
          <List showMore />
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

export default connect(mapStateToProps, mapDispatchToProps)(Practice)
