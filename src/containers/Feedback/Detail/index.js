import React from 'react'
import PropTypes from 'prop-types'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Header } from 'components'
import { progressActions } from 'actions/progress'
import Content from './Content'

const FeedbackDetail = () => {
  return (
    <div className="content-box">
      <Header>本课满意度调查</Header>
      <div className="content">
        <Content />
      </div>
    </div>
  )
}

FeedbackDetail.propTypes = {
  home: PropTypes.instanceOf(Immutable.Map).isRequired,
}

const mapStateToProps = state => ({
  home: state.get('home'),
})

const mapDispatchToProps = dispatch => ({
  onProgress: bindActionCreators(progressActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackDetail)
