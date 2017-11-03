import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { Header } from 'components'
import { reviewActions } from 'actions/review'
import Content from './Content'

class Review extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    review: PropTypes.instanceOf(Immutable.Map).isRequired,
    onReview: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params, user, onReview } = this.props
    onReview.getReviewInfo(params.lessonId, user.userid)
  }

  render () {
    const { review } = this.props

    const contentProps = {
      info: review.get('info'),
      comment: review.get('comment'),
    }

    return (
      <div className="content-box">
        <Header>查看评语</Header>
        <div className="content">
          <Content {...contentProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    review: state.get('review'),
    user: {
      userid: state.getIn(['app', 'userid']),
    },
  }
}

const mapDispatchToProps = dispatch => ({
  onReview: bindActionCreators(reviewActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Review)
