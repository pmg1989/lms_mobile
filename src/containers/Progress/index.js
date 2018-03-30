import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Immutable from 'immutable'
import { bindActionCreators } from 'redux'
import { Header } from 'components'
import { progressActions } from 'actions/progress'
import { renderTypeName } from 'utils/tools'
import Top from './Top'
import Content from './Content'
import Bottom from './Bottom'

class Progress extends Component {
  static propTypes = {
    params: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    progress: PropTypes.instanceOf(Immutable.Map).isRequired,
    onProgress: PropTypes.object.isRequired,
  }

  componentWillMount () {
    const { params, onProgress } = this.props
    onProgress.getProgressInfo(params.contractId, params.categoryId)
  }

  render () {
    const { params, progress, user, onProgress } = this.props
    const info = progress.get('info')
    const lessons = progress.get('lessons')

    const topProps = {
      info,
      hasLessons: !!lessons.size,
    }

    const contentProps = {
      type: params.type,
      user,
      lessons,
      category: info.get('category_idnumber'),
      onProgress,
    }

    const bottomProps = {
      info,
      params,
      lessons,
    }

    return (
      <div className="content-box">
        <Header>
          {renderTypeName(params.type)}
        </Header>
        <div className="content">
          <Top {...topProps} />
          <Content {...contentProps} />
          <Bottom {...bottomProps} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  progress: state.get('progress'),
  user: {
    rolename: state.getIn(['app', 'rolename']),
    userid: state.getIn(['app', 'userid']),
  },
  params: {
    ...ownProps.params,
    // contractId: decodeURIComponent(ownProps.params.contractId),
    type: ownProps.location.query.type,
    proCategoryId: ownProps.location.query.proCategoryId,
  },
})

const mapDispatchToProps = dispatch => ({
  onProgress: bindActionCreators(progressActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress)
