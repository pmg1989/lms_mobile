import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import moment from 'moment'
import { bindActionCreators } from 'redux'
import { Header } from 'components'
import { reviewActions } from 'actions/review'
import zhugeio from 'utils/zhugeio'
import Content from './Content'

class Review extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    review: PropTypes.instanceOf(Immutable.Map).isRequired,
    onReview: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params, user, onReview } = this.props
    onReview.getReviewInfo(params.lessonId, user.userid)
    .then(({ comment, info }) => {
      zhugeio.review({
        lesson: comment.getIn(['suggestion', 'lesson']),
        student: comment.getIn(['suggestion', 'student']),
        teacher: info.get('teacher'),
        category_summary: info.get('category_summary'),
        dates: moment.unix(info.get('available')).format('YYYY-MM-DD HH:mm'),
        categoryId: info.get('category_idnumber'),
      })
    })
  }

  render () {
    const { review, location: { query: { curLesson } } } = this.props
    const contentProps = {
      info: review.get('info'),
      comment: review.get('comment'),
      curLesson,
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
